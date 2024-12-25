import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTAuthService } from '../../../modules/utlis/JWTAuthServicer.service';

const RoleGuard = (permission: string) => {
  @Injectable()
  class RoleMixin implements CanActivate {
    public readonly logger = new Logger(RoleMixin.name);

    constructor(public readonly JWTAuthService: JWTAuthService) {}

    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();

      try {
        const { permissions } = req;

        if (!permissions || !Array.isArray(permissions)) {
          throw new UnauthorizedException('Permissions are missing or invalid');
        }

        if (!permissions.includes(permission)) {
          return false;
        }
        return true;
      } catch (error) {
        this.logger.error(error.message);
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  return mixin(RoleMixin);
};

export default RoleGuard;
