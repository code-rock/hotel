import { Controller, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller()
export class HotelController {
  constructor(private readonly appService: HotelService) {}

}
