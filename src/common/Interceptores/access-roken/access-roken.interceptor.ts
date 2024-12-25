import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { JWTAuthService } from 'src/modules/utlis/JWTAuthServicer.service';

@Injectable()
export class AccessRokenInterceptor implements NestInterceptor {
  constructor(private readonly jwt: JWTAuthService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    const req = context.switchToHttp().getRequest();

    const { entity } = req.params;

    // if (entity === 'teacher')
    //   secret = process.env.TEACHER_AUTH_TOKEN_SECRET as string;
    // if (entity === 'student')
    //   secret = process.env.STUDENT_AUTH_TOKEN_SECRET as string;
    const secret = process.env[`${entity.toUpperCase()}_AUTH_TOKEN_SECRET`];

    return next.handle().pipe(
      tap(() => {
        const [authToken] = this.jwt.generateTokens([
          { expiresIn: '15m', payload: req.payload, secret: secret },
        ]);
        return res
          .cookie('authCookie', authToken, {
            maxAge: 1000 * 60 * 15, // 15 minutes
            secure: true,
            httpOnly: true,
          })
          .status(200)
          .json({ message: 'access-token accquired' });
      }),
    );
  }
}
