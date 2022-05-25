import { Body, Controller, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express/multer";
import { HotelRoomService } from "./hotel-room.service";

@Controller('api')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Get('/common/hotel-rooms/')
  async searchHouseRoom(
    @Query('limit') limit: number,
    @Query('offset') skip: number,
    @Query('hotel') hotel: number,
    ) {
      return await this.hotelRoomService.search({ limit, skip, hotel })
        .then(res => {
          return res
          // return {
          //   id: string,
          //   title: string,
          //   images: [string],
          //   hotel: {
          //   id: string,
          //   title: string
          // }
        })
  }

  @Get('/common/hotel-rooms/:id')
  async getRoomInfo(@Param('id') id: string) {
    return await this.hotelRoomService.findById(id, true)
  }
  // {
  //   "id": string,
  //   "title": string,
  //   "description": string,
  //   "images": [string],
  //   "hotel": {
  //     "id": string,
  //     "title": string,
  //     "description": string
  //   }
  // }

  // Доступно только аутентифицированным пользователям с ролью `admin`.
  // `401` - если пользователь не аутентифицирован
  // `403` - если роль пользователя не `admin`
  @UseInterceptors(FilesInterceptor('files'))
  @Post('/admin/hotel-rooms/')
  async addHotelRoom(
    @UploadedFiles() images: Array<any>,
    @Body() body
  ) {
    //     Данный запрос предполагает загрузку файлов и должен использовать формат `multipart/form-data`.

    // ```form-data
    // title: string
    // description: string
    // hotelId: string
    // images[]: File
    // ```
    return await this.hotelRoomService.create({ ...body, images })
    // {
    //   "id": string,
    //   "title": string,
    //   "description": string,
    //   "images": [string],
    //   "isEnabled": boolean,
    //   "hotel": {
    //     "id": string,
    //     "title": string,
    //     "description": string
    //   }
    // }
  }

  // Доступно только аутентифицированным пользователям с ролью `admin`.
  // `401` - если пользователь не аутентифицирован,
  // `403` - если роль пользователя не `admin`
  @UseInterceptors(FilesInterceptor('files'))
  @Put('/admin/hotel-rooms/:id')
  async changeRoomInfo(
    @UploadedFiles() files: Array<any>,
    @Param('id') id: string,
    @Body() body) {
    // Данный запрос предполагает загрузку файлов и дожен использовать формат `multipart/form-data`.
    // ```form-data
    // title: string
    // description: string
    // hotelId: string
    // isEnabled: boolean
    // images[]: File | string
    const { images, ...rest } = body;
    return await this.hotelRoomService.update(id, { ...rest, images: [...images, ...files] })
    // При обновлении может быть отправлен одновременно список ссылок на уже загруженные картинки и список файлов с новыми картинками.
    // При использовании [`multer`](https://docs.nestjs.com/techniques/file-upload) список загруженных файлов можно получить через `@UploadedFiles()`. Этот список нужно объденить со списком, который пришел в `body`.
    // {
    //   "id": string,
    //   "title": string,
    //   "description": string,
    //   "images": [string],
    //   "isEnabled": boolean,
    //   "hotel": {
    //     "id": string,
    //     "title": string,
    //     "description": string
    //   }
    // }
  }
}