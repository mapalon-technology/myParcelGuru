// author swapnil:-26/06/2019
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanserviceService {

  name: any;
  nameChange = new BehaviorSubject('Shipping Partner');
  constructor() {
    this.name = 'Shipping Partner';
    this.nameChange.next(this.name);
  }

  change(data) {
    this.nameChange.next(data);
  }
}
