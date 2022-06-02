import { ID } from "src/user/user.dto";
import { Reservation } from "./reservation.schema";

export interface ReservationDto {
    user: ID;
    hotel: ID;
    room: ID;
    dateStart: Date;
    dateEnd: Date;
}

export interface ReservationSearchOptions {
    user: ID;
    dateStart: Date;
    dateEnd: Date;
}

export interface IReservation {
    addReservation(data: ReservationDto): Promise<Reservation>;
    removeReservation(id: ID): Promise<void>;
    getReservations(
        filter: ReservationSearchOptions
    ): Promise<Array<Reservation>>;
}

export interface IReservationInfo {
    startDate: string;
    endDate: string;
    hotelRoom: {
        title: string;
        description: string;
        images: string[];
    };
    hotel: {
        title?: string;
        description: string;
    }
}