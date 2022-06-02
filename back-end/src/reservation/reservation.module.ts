import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HotelRoom, HotelRoomSchema } from "src/hotel-room/hotel-room.schema";
import { HotelRoomService } from "src/hotel-room/hotel-room.service";
import { Hotel, HotelSchema } from "src/hotel/hotel.schema";
import { HotelService } from "src/hotel/hotel.service";
import { ReservationController } from "./reservation.controller";
import { Reservation, ReservationSchema } from "./reservation.schema";
import { ReservationService } from "./reservation.service";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Reservation.name, schema: ReservationSchema },
        { name: HotelRoom.name, schema: HotelRoomSchema },
        { name: Hotel.name, schema: HotelSchema },
    ])],
    controllers: [ReservationController],
    providers: [ReservationService, HotelRoomService, HotelService],
})
export class ReservationModule {}