import { Component } from '@angular/core';
import { Form, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardServiceService } from '../card-service.service';
import { card, defaultCard } from '../Models/card';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private service : CardServiceService, private router:Router, private fb: FormBuilder){}

  showSuccess = false
  currentCard = defaultCard;

  cardForm: FormGroup = this.fb.group({
    cardFront: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    cardBack: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
  });

  processCardForm(e: Event) : void {
    e.preventDefault();
    let cardToCreate : card = {
      front : this.cardForm.value['cardFront'],
      back : this.cardForm.value['cardBack'],
    }
  
    this.service.createCard(cardToCreate).subscribe((data => {
        this.currentCard = data;
        this.showSuccess = true;     

    }))





  
  }
  


}
