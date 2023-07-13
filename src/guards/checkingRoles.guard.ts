import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { Role } from '@prisma/client';
import RequestWithUser from 'src/authentication/requestWithUser.interface'; 
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return user?.role.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;
