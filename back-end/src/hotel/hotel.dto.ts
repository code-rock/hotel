import { ID } from "src/user/user.dto";
import { HotelRoom } from "../hotel-room/hotel-room.schema";
import { Hotel } from "./hotel.schema";

export interface IHotelService {
    create(data: any): Promise<Hotel>;
    findById(id: ID): Promise<Hotel>;
    search(params: Pick<Hotel, "title">): Promise<Hotel[]>;
}

export interface SearchRoomsParams {
    limit: number;
    offset: number;
    title: string;
    isEnabled?: true;
}

export interface IHotelRoomService {
    create(data: Partial<HotelRoom>): Promise<HotelRoom>;
    findById(id: ID, isEnabled?: true): Promise<HotelRoom>;
    search(params: SearchRoomsParams): Promise<HotelRoom[]>;
    update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}