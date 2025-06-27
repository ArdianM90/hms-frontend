import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {Hotel} from '../../model/hotel.model';

@Component({
  selector: 'app-item-box',
  imports: [RouterModule, CommonModule, MatCardHeader, MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatCardImage, MatButton, MatButton, MatButton, NgOptimizedImage],
  templateUrl: './item-box.component.html',
  styleUrl: './item-box.component.css'
})
export class ItemBoxComponent {
  @Input() hotel: Hotel | undefined
}
