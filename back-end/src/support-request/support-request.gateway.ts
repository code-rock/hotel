import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { SupportRequestClientService } from "./services/support-request-client.service";
import { SupportRequestService } from "./services/support-request.service";


@WebSocketGateway(8081, { cors: true })//, { transports: ['websocket'] }
export class SupportRequestGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    wss;

    constructor(
        private supportRequestService: SupportRequestService,
        private supportRequestClentService: SupportRequestClientService
    ) {
        console.log(' SupportRequestGateway')
    }

    handleDisconnect(client: any) {
        console.log(client, 'Disconnect');
    }

    handleConnection(client: any, ...args: any[]) {
        //console.log(client, ...args, 'Connect');
        client.emit('connection', 'Sucssecfully connection to server');
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
    