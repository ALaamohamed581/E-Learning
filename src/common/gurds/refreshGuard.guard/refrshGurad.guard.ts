import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const RefrshGuradGuard = (): any => {
  @Injectable()
  class RefrshGuradGuardMixin implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const { refCookie: refTokne } = request.cookies;
      const { entity } = request.params;

      const secret =
        process.env[`${entity.toUpperCase()}_REFRESH_TOKEN_SECRET`];
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
