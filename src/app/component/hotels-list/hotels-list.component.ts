import {Component, OnDestroy, OnInit} from '@angular/core';
import {HotelService} from '../../service/hotel.service'
import {Hotel} from '../../model/hotel.model'
import {NgFor} from '@angular/common';
import {NavbarComponent} from "../navbar/navbar.component";
import {ItemBoxComponent} from "../item-box/item-box.component";
import {Subscription} from 'rxjs';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-hotels-list',
  imports: [NgFor, NavbarComponent, ItemBoxComponent, FooterComponent],
  templateUrl: './hotels-list.component.html',
  styleUrl: './hotels-list.component.css'
})
export class HotelsListComponent implements OnInit, OnDestroy {
  private httpSub!: Subscription;
  hotels: Hotel[] = [];

  constructor(
    private hotelService: HotelService) {
  }

  ngOnInit() {
    this.httpSub = this.hotelService.getAllHotels().subscribe(list => {
      this.hotels = list
    });
  }

  ngOnDestroy() {
    this.httpSub.unsubscribe();
  }

}
