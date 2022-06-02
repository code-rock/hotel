import { Session } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { SupportRequestClientService } from "./services/support-request-client.service";
import { SupportRequestService } from "./services/support-request.service";
// import { Server, Socket } from "socket.io";
// import { SupportRequestClientService } from "./support-request-client.service";
// import { SupportRequestService } from "./support-request.service";


@WebSocketGateway(4001)
export class SupportRequestGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    wws;

    constructor(
        private supportRequestService: SupportRequestService,
        private supportRequestClentService: SupportRequestClientService
    ) {}

    handleDisconnect(client: any) {
        console.log(client, 'Disconnect');
    }

    handleConnection(client: any, ...args: any[]) {
        console.log(client, ...args, 'Connect');
    }
    afterInit(server: any) {
        console.log(server, 'AfterInit');
    }

    @SubscribeMessage('msgToServer')
    addComment(
        @MessageBody() text: string, 
        @ConnectedSocket() client: any,
    )//: Promise<any> 
    {
        console.log(client, text, 'addComment')
        // return this.supportRequestService.sendMessage({
        //     author: ID;
        //     supportRequest: ID;
        //     text: text;
        // })
    }
}
    