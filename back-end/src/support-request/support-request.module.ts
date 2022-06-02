import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SupportRequestClientService } from "./services/support-request-client.service";
import { SupportRequestEmployeeService } from "./services/support-request-employee.service";
import { SupportRequestGateway } from "./support-request.gateway";
// import { SupportRequestGateway } from "./support-request.gateway";
import { SupportRequest, SupportRequestSchema } from "./schemes/support-request.schema";
import { SupportRequestService } from "./services/support-request.service";
import { Message, MessageSchema } from "./schemes/message.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SupportRequest.name, schema: SupportRequestSchema },
            { name: Message.name, schema: MessageSchema }
        ]),
    ],
    controllers: [],
    providers: [
        SupportRequestService, 
        SupportRequestEmployeeService, 
        SupportRequestClientService,
        SupportRequestGateway
    ]
})
export class SupportRequestModule {}  // SupportRequestGateway