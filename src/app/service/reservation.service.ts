import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationRequest } from '../model/reservation-request.model';
import { ReservationResponse } from '../model/reservation-response.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  reservationRequest: ReservationRequest = {
    uaId: '',
    hotelId: 0
  };

  addToCart(hotelId: number, uaId: string): Observable<ReservationResponse> {
        this.reservationRequest.hotelId = hotelId
        this.reservationRequest.uaId = uaId
        console.log("Dodaję do koszyka: " + this.reservationRequest.hotelId + ", " + this.reservationRequest.uaId);
        return this.http.put<ReservationResponse>(`${environment.apiUrl}/reservation/create`, this.reservationRequest)
      }
}
