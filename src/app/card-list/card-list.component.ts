import { Component, OnInit } from '@angular/core';
import { CardDetailsService } from '../card-details.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  creditCards = [];

  constructor(private cardDetails: CardDetailsService) {}

  ngOnInit(): void {
    this.creditCards = this.cardDetails.getAllCards();
  }
  delete(id) {
    this.cardDetails.deleteCard(id);
  }
}
