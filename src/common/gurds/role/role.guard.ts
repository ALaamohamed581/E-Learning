import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTAuthService } from '../../../modules/utlis/JWTAuthServicer.service';

const RoleGuard = ({ role, ...permissions }) => {
  @Injectable()
  class RoleMixin implements CanActivate {
    constructor(private readonly JWTAuthService: JWTAuthService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();

      const { authCookie: token } = req.cookies;
      const secret = process.env[`${role.toUpperCase()}_AUTH_TOKEN_SECRET`];
      try {
        const decoded = this.JWTAuthService.VerifyAuthToken({ token, secret });

        req.userId = decoded.payload.id;

        return true;
      } catch (error) {
        console.log(error.message);
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  return mixin(RoleMixin);
};
