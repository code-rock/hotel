import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ReservationService } from "./reservation.service";

@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Доступно только аутентифицированным пользователям с ролью `client`.
  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `client`
  // `400` - если номер с указанным ID не существует или отключен
  @Post('/client/reservations/')
  async reservationRoom(
    @Body('hotelRoom') hotelRoom: string,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
  ) {
    return await this.reservationService.addReservation({ hotelRoom, startDate, endDate })
    // {
    //   "startDate": string,
    //   "endDate": string,
    //   "hotelRoom": {
    //     "title": string,
    //     "description": string,
    //     "images": [string]
    //   },
    //   "hotel": {
    //     "title": string,
    //     "description": string
    //   }
    // }
  }

  // Доступно только аутентифицированным пользователям с ролью `client`.
  // Список броней текущего пользователя.
  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `client`
  @Get('/client/reservations/')
  async getReservationsList() {
    return await this.reservationService.getReservations({})
    // [
    //   {
    //     "startDate": string,
    //     "endDate": string,
    //     "hotelRoom": {
    //       "title": string,
    //       "description": string,
    //       "images": [string]
    //     },
    //     "hotel": {
    //       "title": string,
    //       "description": string
    //     }
    //   }
    // ]
  }
 
  // Доступно только аутентифицированным пользователям с ролью `client`.
  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `client`
  // `403` - если `id` текущего пользователя не совпадает с `id` пользователя в брони
  // `400` - если бронь с указанным ID не существует
  @Delete('/client/reservations/:id')
  async deleteReservation(@Param('id') id: string): Promise<void> {
    await this.reservationService.removeReservation(id)
  }

  // Доступно только аутентифицированным пользователям с ролью `manager`.
  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `manager`
  @Get('/manager/reservations/:userId')
  async getUserReservations(@Param('userId') userId: string) {
    return this.reservationService.getReservations({ userId })
    // [
    //   {
    //     "startDate": string,
    //     "endDate": string,
    //     "hotelRoom": {
    //       "title": string,
    //       "description": string,
    //       "images": [string]
    //     },
    //     "hotel": {
    //       "title": string,
    //       "description": string
    //     }
    //   }
    // ]
  }

  // Доступно только аутентифицированным пользователям с ролью `manager`
  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `manager`
  // `400` - если бронь с указанным ID для пользователя с указанным ID не существует
  @Delete('/manager/reservations/:userId/:reservationId')
  async cancelClientReservation(
      @Param('userId') userId: string, // зачем тут это?
      @Param('reservationId') reservationId: string,
  ) {
    return await this.reservationService.removeReservation(reservationId)
  }
}