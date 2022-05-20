import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HotelRoomController } from "./hotel-room.controller";
import { HotelRoom, HotelRoomSchema } from "./hotel-room.schema";
import { HotelRoomService } from "./hotel-room.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: HotelRoom.name, schema: HotelRoomSchema }])],
    controllers: [HotelRoomController],
    providers: [HotelRoomService],
})
export class HotelModuleModule {}