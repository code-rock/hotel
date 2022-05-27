import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserNotAuthenticatedException } from "src/errors/user-not-authenticated.exception";
import { UserRoleNotSuitableException } from "src/errors/user-role-not-suitable.exception";
import { ROLES_KEY } from "./role.decorator";
import { ERole } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        const requeredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.warn(requeredRoles, 'requeredRoles')
        if (!requeredRoles) return true;
        const result = context.switchToHttp().getRequest();
        console.log(result, 'result');
        const { user } = context.switchToHttp().getRequest();
        console.warn(requeredRoles, 'requeredRoles')
        if (!user) throw new UserNotAuthenticatedException()
        const isAvailable = requeredRoles.includes(user.role)
        if (!isAvailable) throw new UserRoleNotSuitableException()
        return isAvailable
    }
}