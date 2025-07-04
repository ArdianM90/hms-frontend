import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {NgIf, NgFor, NgOptimizedImage} from '@angular/common';
import {RouterModule, ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInput} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {Subscription} from 'rxjs';
import {Hotel} from '../../model/hotel.model';
import {HotelService} from '../../service/hotel.service';
import {ReservationService} from '../../service/reservation.service';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-reservation-page',
  imports: [NavbarComponent, RouterModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatSelectModule, MatCardModule, MatButton, MatInput, NgOptimizedImage, NgIf, NgFor],
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.css'
})
export class ReservationPageComponent implements OnInit, OnDestroy {
  @Input() hotel: Hotel | undefined

  constructor(private route: ActivatedRoute,
              private hotelService: HotelService,
              private reservationService: ReservationService
  ) {
  }

  private httpSub!: Subscription
  orderedRooms: number[] = [0, 0, 0];
  roomOptions: number[] = [0, 1, 2, 3];

  ngOnInit(): void {
    const hotelId: number = this.route.snapshot.params['hotelId'];
    console.log("Hotel ID: " + hotelId)
    this.hotelService.getHotel(hotelId).subscribe((response: Hotel): void => {
      if (response) {
        this.hotel = response;
      }
    });
  }

  addToCart(): void {
    console.log("Klikam koszyk (" + this.hotel + ", " + this.hotel?.id + ")");
    if (this.hotel && this.hotel.id) {
      this.httpSub = this.reservationService.addToCart(this.hotel.id, "123").subscribe((response) => {
        console.log(response);
      });
    } else {
      console.log("Puste dane - hotel: " + this.hotel + ", albo id: " + this.hotel?.id)
    }
  }

  ngOnDestroy(): void {
    if (this.httpSub)
      this.httpSub.unsubscribe();
  }
}
