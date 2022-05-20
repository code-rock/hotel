import { Controller } from "@nestjs/common";
import { ReservationService } from "./reservation.service";

@Controller()
export class ReservationController {
  constructor(private readonly appService: ReservationService) {}

}