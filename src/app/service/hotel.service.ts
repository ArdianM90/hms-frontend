import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Hotel} from '../model/hotel.model'
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient) {
  }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${environment.apiUrl}/hotels`, { withCredentials: true })
  }

  getHotel(hotelId: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${environment.apiUrl}/hotel?hotelId=${hotelId}`, { withCredentials: true })
  }
}
