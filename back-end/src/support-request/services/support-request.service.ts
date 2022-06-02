import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISupportRequestService } from "../support-request.dto";
import { SupportRequest, TSupportRequestDocument } from "../schemes/support-request.schema";
import { Message, TMessageDocument } from "../schemes/message.schema";

// Оповещения должны быть реализованы через механизм EventEmitter.
@Injectable()
export class SupportRequestService { // implements ISupportRequestService
    constructor(
        @InjectModel(SupportRequest.name) private supportRequestModel: Model<TSupportRequestDocument>,
        @InjectModel(Message.name) private messageModel: Model<TMessageDocument>
    ) {}
    
   async  findSupportRequests(params) {
        return await this.supportRequestModel.findOne(params).exec();
    }

    async sendMessage({ author, supportRequest, text}) {
        const message = await new this.messageModel({ author,  text, sentAt: new Date() });
        const request = await this.findSupportRequests({ _id: supportRequest })
        await this.supportRequestModel.findByIdAndUpdate(supportRequest, { messages: request.messages.push(message) }, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        return message.save();
    }

    async getMessages(supportRequest) {
        const request = await this.supportRequestModel.findOne({ _id: supportRequest }).exec();
        return request.messages
    }

    subscribe(handler) {
      
    }
}