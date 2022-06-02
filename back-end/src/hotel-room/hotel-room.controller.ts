import { Body, Controller, Get, Header, Request, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, HttpException } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";
import { editFileName } from "src/common/image/file-name";
import { imageFileFilter } from "src/common/image/filter";
import { Roles } from "src/common/role/role.decorator";
import { ERole } from "src/common/role/role.enum";
import { RolesGuard } from "src/common/role/role.guard";
import { IHotelRoom, IHotelRoomShort } from "./hotel-room.dto";
import { HotelRoomService } from "./hotel-room.service";

import { ObjectId } from 'mongodb';
import { HotelService } from "src/hotel/hotel.service";

@Controller('api')
export class HotelRoomController {
  constructor(
    private readonly hotelRoomService: HotelRoomService,
    private readonly hotelService: HotelService
  ) {}
    
  @Get('common/hotel-rooms')
  async searchHouseRoom(
    @Query('limit') limit: number,
    @Query('offset') skip: number,
    @Query('hotel') hotelId: string,
    )//: Promise<IHotelRoomShort[]>
    {
      const hotel = hotelId ? {hotel: new ObjectId(hotelId)} : {};
      const rooms = await this.hotelRoomService.search(hotel, { limit, skip });
      
      const hotelInfо = hotelId ? await this.hotelService.findById(hotelId) : undefined
      const hotels = !hotelId ? await this.hotelService.search({}) : undefined
      
      return rooms.map(room => {
        const currHotel = hotels ? hotels.find(hotel => hotel._id.toString() === room.hotel.toString()): null
  
        return ({
          id: room._id,
          title: room.title,
          images: room.images,
          hotel: hotelInfо ? {
              id: hotelInfо._id.toHexString(),
              title: hotelInfо.title
          } : {
            id: room.hotel.toString(),
            title: currHotel ? currHotel.title : 'Таинственный отель'
          }
      })
    })
  }

  @Get('/common/hotel-rooms/:id')
  async getRoomInfo(@Param('id') id: string): Promise<IHotelRoom> {
    const room = await this.hotelRoomService.findById(id, true);
    const hotel = await this.hotelService.findById(room.hotel.toString());
    return {
        id: room.id,
        description: room.description,
        images: room.images,
        hotel: {
          id: hotel._id.toString(),
          title: hotel.title,
          description: hotel.description
        }
    }
  }

  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post('admin/hotel-rooms')
  async addHotelRoom(
    @UploadedFiles() images,
    @Body() body,
  ): Promise<IHotelRoom & { isEnabled: boolean }>
  {
    const { title, description, hotelId } = body;
    const hotelRoom = await this.hotelRoomService.create({ 
      description,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      isEnabled: true,
      hotel: new ObjectId(hotelId),
      images
    })
    if (!hotelRoom) throw new HttpException('Номер не найден', 404);
    const hotel = await this.hotelService.findById(hotelId);
    if (!hotel) throw new HttpException('Отель не найден', 404);
    return {
      id: hotelRoom._id.toString(),
      description,
      images: images.map(img => img.path),
      isEnabled: hotelRoom.isEnabled,
      hotel: {
        id: hotel._id.toString(),
        title: hotel.title,
        description: hotel.description
      }
    }
  }

  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Put('admin/hotel-rooms/:id')
  async changeRoomInfo(
    @UploadedFiles() files,
    @Param('id') id: string,
    @Body() body): Promise<IHotelRoom | { isEnabled: boolean }>
  {
    const { images, ...rest } = body;
    const room = await this.hotelRoomService.findById(id, true)

    if (rest.hotelId) {
      var hotel = await this.hotelService.findById(rest.hotelId)
    }

    return await this.hotelRoomService
      .update(id, {
        hotel: rest.hotelId.toString() || room.hotel.toString(),
        description: rest.description || room.description,
        images: [...room.images, ...files.map(img => img.path)],
        createdAt: room.createdAt,
        updatedAt: new Date(),
        isEnabled: rest.isEnabled || room.isEnabled,
      }).then(res => ({  
        id: res.id,
        description: res.description,
        isEnabled: res.isEnabled,
        images: res.images,
        hotel: rest.hotelId ? {
          id: hotel._id.toString() || room.id,
          title: hotel.title,
          description: hotel.description
        }: room.hotel
      })
    )
  }
}