import { Routes } from '@angular/router';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { HotelsListComponent } from './component/hotels-list/hotels-list.component';
import { ReservationPageComponent } from './component/reservation-page/reservation-page.component';

export const routes: Routes = [
    {
        path: 'login-page',
        component: LoginPageComponent,
        title: 'Login Page'
    },
    {
        path: 'hotels-list',
        component: HotelsListComponent,
        title: 'Hotels List'
    },
    {
        path: 'reservation/create/:hotelId',
        component: ReservationPageComponent,
        title: 'Reservation Page'
    },
    { path: '', redirectTo: '/login-page', pathMatch: 'full' }
];
