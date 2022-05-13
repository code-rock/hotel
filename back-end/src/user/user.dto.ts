import { ObjectId } from "mongoose";
import { User } from "./user.schema";

export type ID = string | ObjectId; 

export interface ISearchUserParams {
    limit: number;
    offset: number;
    email: string;
    name: string;
    contactPhone: string;
}

export interface IUserService {
    create(data: Partial<User>): Promise<User>;
    findById(id: ID): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findAll(params: ISearchUserParams): Promise<User[]>;
  }