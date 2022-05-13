import { ID } from "src/user/user.dto";
import { Message } from "./message.schema";
import { SupportRequest } from "./support-request.schema";

interface CreateSupportRequestDto {
    user: ID;
    text: string;
}

interface SendMessageDto {
    author: ID;
    supportRequest: ID;
    text: string;
}

interface MarkMessagesAsReadDto {
    user: ID;
    supportRequest: ID;
    createdBefore: Date;
}

interface GetChatListParams {
    user: ID | null;
    isActive: boolean;
}

interface ISupportRequestService {
    findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
    sendMessage(data: SendMessageDto): Promise<Message>;
    getMessages(supportRequest: ID): Promise<Message[]>;
    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void
    ): () => void;
}

interface ISupportRequestClientService {
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
}

interface ISupportRequestEmployeeService {
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: ID): Promise<Message[]>;
    closeRequest(supportRequest: ID): Promise<void>;
}