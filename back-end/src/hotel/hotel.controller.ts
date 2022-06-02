import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/role/role.decorator';
import { ERole } from 'src/common/role/role.enum';
import { RolesGuard } from 'src/common/role/role.guard';
import { IHotel } from './hotel.dto';
import { HotelService } from './hotel.service';

@Controller('api')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @Post('admin/hotels')
  async addHotel(
    @Body('title') title: string,
    @Body('description') description: string
  ): Promise<IHotel> {
    return await this.hotelService.create({
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(({ _id, title, description }) => ({
      id: _id.toString(),
      title,
      description
    })) 
  }

  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @Get('admin/hotels')
  async getHotels(
    @Query('limit') limit: number,
    @Query('offset') skip: number
  ): Promise<IHotel[]> {
    return (await this.hotelService
      .search({ limit, skip }))
      .map(({ _id, title, description }) => ({
        id: _id.toString(),
        title,
        description
    }))
  }

  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @Put('admin/hotels/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string
  ): Promise<IHotel> {
    return await this.hotelService
      .update(id, { title, description })
      .then(({ _id, title, description }) => ({
        id: _id.toString(),
        title,
        description
      })) 
  }
}
