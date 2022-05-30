import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserNotAuthenticatedException } from "src/errors/user-not-authenticated.exception";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { session } = context.switchToHttp().getRequest();
        if (!session.user) throw new UserNotAuthenticatedException()
        return !!session.user;
    }
}