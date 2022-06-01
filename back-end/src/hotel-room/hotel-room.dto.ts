import { IHotel } from "src/hotel/hotel.dto"

export interface IHotelRoomShort {
    id: string,
    title: string,
    images: [string],
    hotel: {
        id: string,
        title: string
    }
}

export interface IHotelRoom {
    id: string,
    description: string,
    images: string[],
    hotel: IHotel,
}