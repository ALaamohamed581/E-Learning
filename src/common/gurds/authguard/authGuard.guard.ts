import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTAuthService } from 'src/modules/utlis/JWTAuthServicer.service';
import { Payload } from 'src/typse/token.types';

declare module 'express' {
  interface Request {
    payload?: Payload;
    queryString?: any;
    userId?: number;
  }
}
export const AuthGuard = (role = 'student'): any => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(private readonly JWTAuthService: JWTAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      let secret: string;
      const request = context.switchToHttp().getRequest();
      const { entity } = request.params;
      const { authCookie: token } = request.cookies;

      if (entity === 'teacher') {
        secret = process.env.TEACHER_AUTH_TOKEN_SECRET as string;
      }
      if (entity === 'student') {
        secret = process.env.STUDENT_AUTH_TOKEN_SECRET as string;
      }

      if (!token) {
        throw new UnauthorizedException('No auth cookie found');
      }
      try {
        const decoded = this.JWTAuthService.VerifyAuthToken({ token, secret });

        request.payload = decoded.payload;

        return true;
      } catch (error) {
        console.log(error.message);
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }

  return mixin(AuthGuardMixin);
};
