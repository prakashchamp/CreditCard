import { Injectable } from '@angular/core';

interface CreditCard {
  id?: number;
  cardNumber: string;
  cardHolderName: string;
  cvv: string;
  cardValidity: {
    month: string;
    year: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CardDetailsService {
  cardId: number;
  cardList: CreditCard[] = [];
  constructor() {}

  addCard(cardInfo: CreditCard): void {
    this.cardList = this.cardList || [];
    const doesCardExist = this.cardList.filter(
      (card) => card.cardNumber === cardInfo.cardNumber
    );
    // console.log(doesCardExist);

    if (doesCardExist.length !== 0) {
      window.alert('Card Already exists');
    } else {
      this.cardId =
        window.localStorage.getItem('cardIdGenerate') === null
          ? 1
          : parseInt(window.localStorage.getItem('cardIdGenerate'));
      cardInfo.id = this.cardId;
      this.cardList = [cardInfo, ...this.cardList];
      window.localStorage.setItem('CreditCards', JSON.stringify(this.cardList));
      // console.log(this.cardList);
      window.localStorage.setItem(
        'cardIdGenerate',
        JSON.stringify(this.cardId + 1)
      );
      location.reload();
    }
  }

  getAllCards(): CreditCard[] {
    return (this.cardList = JSON.parse(
      window.localStorage.getItem('CreditCards')
    ));
  }

  getCard(id): CreditCard[] {
    this.cardList = JSON.parse(window.localStorage.getItem('CreditCards'));
    let filteredCard = this.cardList.filter((card) => card.id === id);

    return filteredCard;
  }

  deleteCard(id: number): void {
    this.cardList = this.cardList.filter((card) => card.id !== id);
    window.localStorage.setItem('CreditCards', JSON.stringify(this.cardList));
    // console.log(this.cardList);
    location.reload();
  }
  updateCard(cardToBeUpdated, id): void {
    console.log(cardToBeUpdated);

    for (let index = 0; index < this.cardList.length; index++) {
      if (this.cardList[index].id === id) {
        this.cardList[index].cardNumber = cardToBeUpdated.cardNumber;
        this.cardList[index].cardHolderName = cardToBeUpdated.cardHolderName;
        this.cardList[index].cvv = cardToBeUpdated.cvv;
        this.cardList[index].cardValidity.month =
          cardToBeUpdated.cardValidity.month;
        this.cardList[index].cardValidity.year =
          cardToBeUpdated.cardValidity.year;
      }
      window.localStorage.setItem('CreditCards', JSON.stringify(this.cardList));
      location.reload();
    }
  }
}
