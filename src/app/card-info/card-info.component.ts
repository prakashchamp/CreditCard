import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CardDetailsService } from '../card-details.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css'],
})
export class CardInfoComponent implements OnInit {
  creditCard;
  cardList;
  childComponentDisable = true;
  constructor(
    private route: ActivatedRoute,
    private cardDetails: CardDetailsService
  ) {}

  ngOnInit(): void {
    let id: number;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = parseInt(params.get('id'));
    });

    this.creditCard = this.cardDetails.getCard(id);
    // console.log(this.creditCard);
  }
}
