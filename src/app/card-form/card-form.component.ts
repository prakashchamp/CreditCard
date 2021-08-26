import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { CardDetailsService } from '../card-details.service';
import { UpperCasePipe } from '@angular/common';

import {
  numberValidator,
  nameValidator,
} from '../Validators/creditCardValidation';
import { CardNumberPipe } from '../card-number.pipe';

interface MonthYear {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
  @Input() public parentFormData?;
  @Input() public childDisable?;

  disableInput = false;

  creditCardForm = this.formBuilder.group({
    cardNumber: ['', [Validators.required, Validators.minLength(19)]],
    cardHolderName: ['', [Validators.required]],
    cardValidity: this.formBuilder.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
    }),
    cvv: ['', [Validators.required, Validators.minLength(3)]],
  });

  months: MonthYear[] = [
    { value: '01', viewValue: '01 - January' },
    { value: '02', viewValue: '02 - February' },
    { value: '03', viewValue: '03 - March' },
    { value: '04', viewValue: '04 - April' },
    { value: '05', viewValue: '05 - May' },
    { value: '06', viewValue: '06 - June' },
    { value: '07', viewValue: '07 - July' },
    { value: '08', viewValue: '08 - August' },
    { value: '09', viewValue: '09 - September' },
    { value: '10', viewValue: '10- October' },
    { value: '11', viewValue: '11 - November' },
    { value: '12', viewValue: '12 - December' },
  ];

  years: MonthYear[] = [
    { value: '2016', viewValue: '2016' },
    { value: '2017', viewValue: '2017' },
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
  ];

  disableBtn = false;

  constructor(
    private formBuilder: FormBuilder,
    private cardDetails: CardDetailsService,
    private upperCasePipe: UpperCasePipe,
    private cardNumberPipe: CardNumberPipe
  ) {}

  ngOnInit(): void {
    this.creditCardForm.valueChanges.subscribe((changedObj: any) => {
      this.disableBtn = this.creditCardForm.valid;
    });

    this.creditCardForm.get('cardHolderName').valueChanges.subscribe((name) => {
      if (name) {
        this.creditCardForm.patchValue(
          {
            cardHolderName: this.upperCasePipe
              .transform(name)
              .replace(/[!@#$%^&*(),.?":{}|<>0-9]/g, ''),
          },
          { emitEvent: false }
        );
      }
    });
    this.creditCardForm
      .get('cardNumber')
      .valueChanges.subscribe((value: string) => {
        if (value) {
          this.creditCardForm.patchValue(
            {
              cardNumber: this.cardNumberPipe.transform(value),
            },
            { emitEvent: false }
          );
          console.log(this.cardNumberPipe.transform(value));
        }
      });
    this.creditCardForm.get('cvv').valueChanges.subscribe((value: string) => {
      if (value) {
        this.creditCardForm.patchValue(
          {
            cvv: this.cardNumberPipe.transform(value),
          },
          { emitEvent: false }
        );
        console.log(this.cardNumberPipe.transform(value));
      }
    });

    if (this.parentFormData) {
      // console.log(this.parentFormData);
      this.creditCardForm.patchValue({
        cardNumber: this.parentFormData[0].cardNumber,
        cardHolderName: this.parentFormData[0].cardHolderName,
        cvv: this.parentFormData[0].cvv,
        cardValidity: {
          month: this.parentFormData[0].cardValidity.month,
          year: this.parentFormData[0].cardValidity.year,
        },
      });
      this.disableInput = true;
    }
  }

  onSubmit() {
    // console.log(this.creditCardForm);
    if (this.disableInput) {
      //Update Card
      let id = parseInt(this.parentFormData[0].id);
      this.cardDetails.updateCard(this.creditCardForm.value, id);
    } else {
      //Save Card
      this.cardDetails.addCard(this.creditCardForm.value);
    }
    this.creditCardForm.reset();
  }
}
