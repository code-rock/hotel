import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserAlreadyLogginedInException } from "src/errors/user-already-logged-in.exception";

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { session } = context.switchToHttp().getRequest();
        if (session.user) throw new UserAlreadyLogginedInException()
        return !session.user;
    }
}