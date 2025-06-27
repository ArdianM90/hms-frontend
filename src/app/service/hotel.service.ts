import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Hotel } from '../model/hotel.model'

@Injectable({
    providedIn: 'root',
})
export class HotelService {
    constructor(private http: HttpClient) {}

    getAllHotels(): Observable<Hotel[]> {
        return this.http.get<Hotel[]>(`http://localhost:8080/hms/v1/hotels`)
    }

    getHotel(hotelId: number): Observable<Hotel> {
        return this.http.get<Hotel>(`http://localhost:8080/hms/v1/hotel?hotelId=${hotelId}`)
    }
}