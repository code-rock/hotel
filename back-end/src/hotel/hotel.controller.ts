import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('api')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  // Доступно только аутентифицированным пользователям с ролью `admin`.
  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `admin`
  @Post('/admin/hotels/')
  async addHotel(
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    return await this.hotelService.create({
      title,
      description,
      createdAt: new Date()
    })
    // {
    //   "id": string,
    //   "title": string,
    //   "description": string
    // }
  }

  // Доступно только аутентифицированным пользователям с ролью `admin`
  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `admin`
  @Get('/admin/hotels/')
  async getHotels(
    @Query('limit') limit: number,
    @Query('offset') skip: number
  ) {
    return await this.hotelService.search({ limit, skip })
    // {
    //   "id": string,
    //   "title": string,
    //   "description": string
    // }
  }

  // Доступно только аутентифицированным пользователям с ролью `admin`.
  // `401` - если пользователь не аутентифицирован,
  // `403` - если роль пользователя не `admin`. 
  @Put('/admin/hotels/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    return await this.hotelService.update(id, { title, description })
    // {
    //   "id": string,
    //   "title": string,
    //   "description": string
    // }
  }
}
