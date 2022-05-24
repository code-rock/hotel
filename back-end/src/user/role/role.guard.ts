import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
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

        const { user } = context.switchToHttp().getRequest();
        console.warn(user.role, 'user.role')
        return requeredRoles.includes(user.role)
    }
}