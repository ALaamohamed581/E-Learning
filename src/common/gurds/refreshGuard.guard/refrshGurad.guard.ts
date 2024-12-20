import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const RefrshGuradGuard = (role: string): any => {
  @Injectable()
  class RefrshGuradGuardMixin implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      let secret;
      const request = context.switchToHttp().getRequest();
      const { refCookie: refTokne } = request.cookies;
      const { entity } = request.params;

      if (entity === 'teacher') {
        secret = process.env.TEACHER_REFRESH_TOKEN_SECRET as string;
      } else if (entity === 'student') {
        secret = process.env.STUDENT_REFRESH_TOKEN_SECRET as string;
      }

      if (!refTokne) {
        throw new UnauthorizedException('No refresh cookie found');
      }

      if (!secret) {
        throw new UnauthorizedException('Refresh token secret not found');
      }

      try {
        const decoded = await this.jwtService.verify(refTokne, {
          secret,
        });
        request.userId = decoded.userId;
        return true;
      } catch (error) {
        console.log(error.message);
        throw new UnauthorizedException('Invalid or expired refresh token');
      }
    }
  }

  return mixin(RefrshGuradGuardMixin);
};
