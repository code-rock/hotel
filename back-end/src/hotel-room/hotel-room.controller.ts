import { Controller } from "@nestjs/common";
import { HotelRoomService } from "./hotel-room.service";

@Controller()
export class HotelRoomController {
  constructor(private readonly appService: HotelRoomService) {}

}