import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import {Observable} from 'rxjs'
import { card } from './Models/card';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor(private http : HttpClient) { }

  apiRoot : string = "http://localhost:5092/"
  

  public getAllCards(): Observable<Array<any>> {
    return this.http.get(this.apiRoot + 'Cards') as Observable<Array<any>>;
  }

  public createCard(card : card): Observable<card> {
    return this.http.post(this.apiRoot + 'Card/create', card) as Observable<any>;
  }

  public updateCard(card : card): Observable<any> {

    return this.http.put(this.apiRoot + 'Card/update', card) as Observable<any>;
  }

  public deletecard(Card : card): Observable<any>{

     var options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'accept' : 'text/plain'
        }),
        body : {
          "Id" : Card.id,
          "front": "stringstri",
          "back": "stringstri",
          "state" : false
        }
      };
    
      console.log(Card.id)
    return this.http.delete(this.apiRoot + 'Card/Delete', options)
  }
  
}
