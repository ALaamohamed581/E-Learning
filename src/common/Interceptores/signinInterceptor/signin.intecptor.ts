import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  mixin,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { JWTAuthService } from 'src/modules/utlis/JWTAuthServicer.service';

export const SignIn = ({ role, authSecret = '', refSecret = '' }): any => {
  @Injectable()
  class SignInMixin implements NestInterceptor {
    constructor(private readonly jwt: JWTAuthService) {}

    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      const res = context.switchToHttp().getResponse();
      const req = context.switchToHttp().getRequest();
      const { entity } = req.params;
      if (entity === 'teacher') {
        refSecret = process.env.TEACHER_REFRESH_TOKEN_SECRET as string;
        authSecret = process.env.TEACHER_AUTH_TOKEN_SECRET as string;
      } else if (entity === 'student') {
        authSecret = process.env.STUDENT_AUTH_TOKEN_SECRET as string;
        refSecret = process.env.STUDENT_REFRESH_TOKEN_SECRET as string;
      }

      return next.handle().pipe(
        tap(() => {
          const [authToken, refreshToken] = this.jwt.generateTokens([
            { expiresIn: '15m', payload: req.payload, secret: authSecret },
            { expiresIn: '1day', payload: {}, secret: refSecret },
          ]);
          res
            .cookie('refCookie', refreshToken, {
              maxAge: 1000 * 60 * 60 * 24, // 24 hours
              secure: true,
            })
            .cookie('authCookie', authToken, {
              maxAge: 1000 * 60 * 15, // 15 minutes
              secure: true,
              httpOnly: true,
            })
            .status(200);
        }),
      );
    }
  }
  return mixin(SignInMixin);
};
