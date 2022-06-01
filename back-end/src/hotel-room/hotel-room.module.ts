import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Hotel, HotelSchema } from "src/hotel/hotel.schema";
import { HotelService } from "src/hotel/hotel.service";
import { HotelRoomController } from "./hotel-room.controller";
import { HotelRoom, HotelRoomSchema } from "./hotel-room.schema";
import { HotelRoomService } from "./hotel-room.service";

@Module({
    imports: [MongooseModule.forFeature([
            { name: HotelRoom.name, schema: HotelRoomSchema },
            { name: Hotel.name, schema: HotelSchema }
        ])
    ],
    controllers: [HotelRoomController],
    providers: [HotelRoomService, HotelService],
})
export class HotelRoomModule {}