import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserGuard } from "../common/user/user.guard";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";
import { NotAuthenticatedGuard } from "./not-authenticated.guard";
import { AuthenticatedGuard } from "./authenticated.guard";

@Module({
    imports: [UserModule, PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [
        AuthService,    
        LocalStrategy, 
        SessionSerializer, 
        UserGuard,
        NotAuthenticatedGuard,
        AuthenticatedGuard,
    ],
})
export class AuthModule {}