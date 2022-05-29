// import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
// import { Server, Socket } from "socket.io";
// import { SupportRequestClientService } from "./support-request-client.service";
// import { SupportRequestService } from "./support-request.service";


// @WebSocketGateway(81, { transports: ['websocket'] })
// export class SupportRequestGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//     constructor(
//         private supportRequestService: SupportRequestService,
//         private supportRequestClentService: SupportRequestClientService
//     ) {}

//     // @WebSocketServer() 
//     // server: Server;
//     // chatId: number;

//     // afterInit(server: Server) {
//     //     console.log('Init');
//     // }

//     // handleDisconnect(client: any) {
//     //     console.log('Disconnect');
//     // }

//     // handleConnection(client: any, ...args: any[]) {
//     //     this.server.emit('msgToClient', this.getAllComments(this.chatId))
//     // }

//     // getAllComments(id: number) {
//     //     return this.supportRequestService.findSupportRequests(id)
//     // }

//     // @SubscribeMessage('msgToServer')
//     // addComment(@MessageBody() text: string, @ConnectedSocket() client: Socket): Promise<any> {
//     //     return this.supportRequestClentService.createSupportRequest({ text })
//     // }
// }
    