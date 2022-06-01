import { Body, Controller, Delete, Get, HttpException, Param, Post, Session, UseGuards } from "@nestjs/common";
import { session } from "passport";
import { Roles } from "src/common/role/role.decorator";
import { ERole } from "src/common/role/role.enum";
import { RolesGuard } from "src/common/role/role.guard";
import { User } from "src/common/user/user.decorator";
import { HotelRoomService } from "src/hotel-room/hotel-room.service";
import { HotelService } from "src/hotel/hotel.service";
import { IReservationInfo } from "./reservation.dto";
import { ReservationService } from "./reservation.service";

@Controller('api')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly hotelRoomService: HotelRoomService,
    private readonly hotelService: HotelService
  ) {}

  @Roles(ERole.CLIENT)
  @UseGuards(RolesGuard)
  @Post('client/reservations')
  async reservationRoom(
    @Body('hotelRoom') hotelRoom: string,
    @Body('dateStart') dateStart: string,
    @Body('dateEnd') dateEnd: string,
    @Session() session,
  ) {
    const room = await this.hotelRoomService.findById(hotelRoom)
    if (!room) throw new HttpException('Номер с указанным ID не существует или отключен', 400);
    const hotel = await this.hotelService.findById(room.hotel);
    if (!hotel) throw new HttpException('Отель с указанным ID не существует или отключен', 400);
    const res = await this.reservationService.addReservation({ 
      hotelRoom, 
      dateStart, 
      dateEnd,
      userId: session.user._id,
      hotelId: room.hotel,
      roomId: hotelRoom
    })
    return {
      id: res._id,
      startDate: res.dateStart,
      endDate: res.dateEnd,
      hotelRoom: {
        title: room.title,
        description: room.description,
        images: room.images
      },
      hotel: {
        title: hotel.title,
        description: hotel.description
      }
    }
  }

  @Roles(ERole.CLIENT)
  @UseGuards(RolesGuard)
  @Get('/client/reservations/')
  async getReservationsList(@Session() session): Promise<IReservationInfo[]> 
  {
    const list = await this.reservationService.getReservations({ userId: session.user._id })
    const infо = list.reduce((prev, curr) => {
      return { 
        hotels: prev.hotels.includes(curr.hotelId) ? prev.hotels : [...prev.hotels, curr.hotelId], 
        rooms: prev.rooms.includes(curr.roomId) ? prev.rooms : [...prev.rooms, curr.roomId], 
      }
    }, { hotels: [], rooms: [] })
    
    const hotels = await this.hotelService.search({ _id:  {$in : infо.hotels }}) || [];
    const rooms = await this.hotelRoomService.search({ _id:  {$in : infо.rooms }}) || [];
    
    return list.map((reservation) => {
      const currHotels = hotels.find((hotel) => hotel._id.toString() === reservation.hotelId.toString());
      const currRooms = rooms.find((room) => room._id.toString() === reservation.roomId.toString());
  
      return {
        startDate: reservation.dateStart.toString(),
        endDate: reservation.dateEnd.toString(),
        hotelRoom: {
          title: currRooms.title,
          description: currRooms.description,
          images: currRooms.images
        },
        hotel: {
          title: currHotels.title,
          description: currHotels.description
        }
      }
    })
  }
 
  @Roles(ERole.CLIENT)
  @UseGuards(RolesGuard)
  @Delete('/client/reservations/:id')
  async deleteReservation(
    @Param('id') id: string,
    @Session() session
  ): Promise<void> {
    const reservation = await this.reservationService.getReservations({ userId: session.user._id, _id: id })
    if (reservation && reservation.length) {
      if (reservation[0].userId[0].toString() === session.user._id) {
        await this.reservationService.removeReservation(id)
      } else {
        throw new HttpException('Вы не можете удачить чужую бронь', 403)
      }
    } 
    else {
      throw new HttpException('Бронь с указанным ID не существует', 400)
    }
  }

  @Roles(ERole.MANAGER)
  @UseGuards(RolesGuard)
  @Get('/manager/reservations/:userId')
  async getUserReservations(@Param('userId') userId: string): Promise<IReservationInfo[]>  {
    const list = await this.reservationService.getReservations({ userId })
    const infо = list.reduce((prev, curr) => {
      return { 
        hotels: prev.hotels.includes(curr.hotelId) ? prev.hotels : [...prev.hotels, curr.hotelId], 
        rooms: prev.rooms.includes(curr.roomId) ? prev.rooms : [...prev.rooms, curr.roomId], 
      }
    }, { hotels: [], rooms: [] })
    
    const hotels = await this.hotelService.search({ _id:  {$in : infо.hotels }}) || [];
    const rooms = await this.hotelRoomService.search({ _id:  {$in : infо.rooms }}) || [];
    
    return list.map((reservation) => {
      const currHotels = hotels.find((hotel) => hotel._id.toString() === reservation.hotelId.toString());
      const currRooms = rooms.find((room) => room._id.toString() === reservation.roomId.toString());
  
      return {
        startDate: reservation.dateStart.toString(),
        endDate: reservation.dateEnd.toString(),
        hotelRoom: {
          title: currRooms.title,
          description: currRooms.description,
          images: currRooms.images
        },
        hotel: {
          title: currHotels.title,
          description: currHotels.description
        }
      }
    })
  }
  
  @Roles(ERole.MANAGER)
  @UseGuards(RolesGuard)
  @Delete('/manager/reservations/:userId/:reservationId')
  async cancelClientReservation(
      @Param('userId') userId: string,
      @Param('reservationId') reservationId: string,
  ) {
    const reservation = await this.reservationService.getReservations({ userId, _id: reservationId });
    if (reservation && reservation.length) {
      if (reservation[0].userId[0].toString() === userId) {
        await this.reservationService.removeReservation(reservationId)
      } else {
        throw new HttpException('Бронь с указанным ID для пользователя с указанным ID не существует', 400)
      }
    } 
    else {
      throw new HttpException('Бронь с указанным ID не существует', 400)
    }
  }
}