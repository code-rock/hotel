import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReservationController } from "./reservation.controller";
import { Reservation, ReservationSchema } from "./reservation.schema";
import { ReservationService } from "./reservation.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }])],
    controllers: [ReservationController],
    providers: [ReservationService],
})
export class HotelModuleModule {}