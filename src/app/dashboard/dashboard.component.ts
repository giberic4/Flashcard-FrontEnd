import { Component, ChangeDetectorRef  } from '@angular/core';
import { card, defaultCard } from '../Models/card';
import { CardServiceService } from '../card-service.service';
import {OnInit} from '@angular/core'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, delay } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

constructor(private service : CardServiceService, private router:Router, private fb: FormBuilder, private cdr: ChangeDetectorRef ){}
 cards : card[] = [{id : 2, front : 'loading', back :'card data', state : false, show : true}, {id : 3, front : 'test', back : 'card', state : false, show : true}]

 updateSelected = false;
 selected : card = defaultCard;
 finishedloading = false;

ngOnInit(): void {  
  
  this.service.getAllCards().subscribe((data:any)=> {
    
    this.cards = data; 
    this.cdr.detectChanges();
    this.finishedloading = true;
  
  }) }




cardForm: FormGroup = this.fb.group({
  cardFront: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
  cardBack: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
});

flip(card : card){

  if(card.state == null)
  card.state = true;
  else card.state = !card.state

}

deleteCard(card : card){
this.service.deletecard(card).subscribe();
if(card.show == null)
card.show = true;
}

updateCard(card : card){
this.selected = card;
this.cards = [defaultCard]
this.finishedloading = false;
this.service.getAllCards().subscribe((data:any)=> {
    this.cards = data;
    this.cdr.detectChanges();
    this.finishedloading = true;
})
this.updateSelected = !this.updateSelected


}

closeUpddateCard(){
  this.selected = defaultCard;
  this.updateSelected = !this.updateSelected
}

processCardForm(e: Event) : void {
  e.preventDefault();
  let cardToUpdate : card = {
    id : this.selected.id,
    front : this.cardForm.value['cardFront'],
    back : this.cardForm.value['cardBack'],
  }
  this.service.updateCard(cardToUpdate).subscribe();
  console.log('card id' + cardToUpdate.id)
  console.log('card front' + cardToUpdate.front)
  console.log('card back' + cardToUpdate.back)
  this.cards = [defaultCard]
  this.finishedloading = false;
  this.service.getAllCards().subscribe((data:any)=> {
      this.cards = data;
      this.cdr.detectChanges();
      this.finishedloading = true;
  })
  this.closeUpddateCard()

}


}