import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/role/role.decorator';
import { ERole } from 'src/common/role/role.enum';
import { RolesGuard } from 'src/common/role/role.guard';
import { HotelService } from './hotel.service';

@Controller('api')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `admin`
  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/admin/hotels/')
  async addHotel(
    @Body('title') title: string,
    @Body('description') description: string
  )//: Promise<IHotel> {
  {
    return await this.hotelService.create({
      title,
      description,
      createdAt: new Date()
    }) 
  }

  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `admin`
  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/admin/hotels/')
  async getHotels(
    @Query('limit') limit: number,
    @Query('offset') skip: number
  ) //: Promise<IHotel[]>
  {
    return await this.hotelService.search({ limit, skip })
  }

  // `401` - если пользователь не аутентифицирован,
  // `403` - если роль пользователя не `admin`. 
  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @Put('/admin/hotels/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string
  ) //: Promise<IHotel[]>
  {
    return await this.hotelService.update(id, { title, description })
  }
}
