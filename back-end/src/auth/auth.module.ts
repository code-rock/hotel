import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserGuard } from "../common/user/user.guard";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.auth.guard";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";

@Module({
    imports: [UserModule, PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [
        AuthService, 
        LocalStrategy, 
        SessionSerializer, 
        UserGuard,
        LocalAuthGuard
    ],
})
export class AuthModule {}