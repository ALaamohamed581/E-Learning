import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  mixin,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { JWTAuthService } from 'src/modules/utlis/JWTAuthServicer.service';

export const SignIn = (): any => {
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

      const refSecret =
        process.env[`${entity.toUpperCase()}_REFRESH_TOKEN_SECRET`];

      const authSecret =
        process.env[`${entity.toUpperCase()}_AUTH_TOKEN_SECRET`];

      return next.handle().pipe(
        tap(() => {
          const [authToken, refreshToken] = this.jwt.generateTokens([
            { expiresIn: '15m', payload: req.payload, secret: authSecret },
            { expiresIn: '1day', payload: {}, secret: refSecret },
          ]);
          res
            .cookie('refCookie', refreshToken, {
              maxAge: 1000 * 60 * 60 * 24,
              secure: true,
            })
            .cookie('authCookie', authToken, {
              maxAge: 1000 * 60 * 15,
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
