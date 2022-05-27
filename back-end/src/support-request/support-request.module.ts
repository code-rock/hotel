import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SupportRequestClientService } from "./support-request-client.service";
import { SupportRequestEmployeeService } from "./support-request-employee.service";
import { SupportRequestGateway } from "./support-request.gateway";
import { SupportRequest, SupportRequestSchema } from "./support-request.schema";
import { SupportRequestService } from "./support-request.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: SupportRequest.name, schema: SupportRequestSchema }])],
    controllers: [],
    providers: [SupportRequestService, SupportRequestEmployeeService, SupportRequestClientService, SupportRequestGateway],
})
export class HotelModuleModule {}