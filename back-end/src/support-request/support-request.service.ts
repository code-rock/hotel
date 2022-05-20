import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISupportRequestService } from "./support-request.dto";
import { SupportRequest, TSupportRequestDocument } from "./support-request.schema";

// Оповещения должны быть реализованы через механизм EventEmitter.
@Injectable()
export class SupportRequestService { // implements ISupportRequestService
    constructor(@InjectModel(SupportRequest.name) private supportRequestModel: Model<TSupportRequestDocument>) {}
    
    findSupportRequests(params) {

    }

    sendMessage(data) {

    }

    getMessages(supportRequest) {

    }

    subscribe(handler) {
      
    }
}