import { Body, Controller, Get, Post, Query, UseGuards, Request, Param, Session } from "@nestjs/common";
import { Roles } from "src/common/role/role.decorator";
import { ERole } from "src/common/role/role.enum";
import { RolesGuard } from "src/common/role/role.guard";
import { text } from "stream/consumers";
import { SupportRequestClientService } from "./services/support-request-client.service";
import { SupportRequestService } from "./services/support-request.service";

@Controller('api')
export class SupportRequestController {
    constructor(
      private readonly supportRequestService: SupportRequestService,
      private readonly supportRequestClentService: SupportRequestClientService
    ) {}

    @Roles(ERole.CLIENT)
    @UseGuards(RolesGuard)
    @Post('/client/support-requests/') 
    async createSupportRequest(
        @Body('text') text: string,
        @Session() session
    ) //: Promise<ISupportRequest> 
    {
        const author = session.user._id.toString()
        const request = await this.supportRequestClentService.createSupportRequest({ author });
        await this.supportRequestService.sendMessage({ author, supportRequest: request._id.toHexString(), text})
    }

    // 401 - если пользоватьель не аутентифицирован
    // 403 - если роль пользователя не подходит
    @Roles(ERole.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/manager/support-requests/')
    async getSupportRequestsForManager(
        @Query('limit') limit: number,
        @Query('offset') skip: number,
        @Query('isActive') isActive: boolean,
    )//: Promise<IRequestForManager> 
    {
        return this.supportRequestService.findSupportRequests({ 
            isActive,
            limit,
            skip
        })
    }

    // 401 - если пользоватьель не аутентифицирован
    // 403 - если роль пользователя не подходит
    @Roles(ERole.MANAGER, ERole.CLIENT)
    @UseGuards(RolesGuard)
    @Get('/common/support-requests/:id/messages')
    async getSupportHistory(
        @Param('id') id: string,
        @Request() req
    ) //: Promise<ISupportChatHistory>
    {
        const { user } = req;
        if ((user.role === ERole.CLIENT && id === user._id) || 
            (user.role === ERole.MANAGER)) {
            return this.supportRequestService.findSupportRequests({ id })
        }
    }
}