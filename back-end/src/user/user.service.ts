import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserService } from 'src/user/user.dto';
import { TUserDocument, User } from './user.schema';

@Injectable()
export class UserService implements IUserService {
    constructor(@InjectModel(User.name) private userModel: Model<TUserDocument>) {}

    create(data) {
        const createdUser = new this.userModel(data);
        return createdUser.save();
    }

    findById(id) { 
        return this.userModel.findById(id).exec();
    }

    findByEmail(email) { 
        return this.userModel.findOne({ email }).exec();
    }

    findAll(params) {
        return this.userModel.find().find({}, null, {
            limit: params.limit,
            skip: params.offset,
            sort: {
                name: params.name,
                email: params.email,
                contactPhone: params.contactPhone
            }
        }).exec();
    }
}
