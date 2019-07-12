// Author Swapnil & Dipti:-14/06/2019
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommanserviceService} from '../../../commanservice.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
shippings: any[] = [];
public partner: any;
public title = 'Shipping Partner';
// tslint:disable-next-line: variable-name
  constructor(private _router: Router, private cs: CommanserviceService, private http: HttpClient) {
  console.log(window.location.href);
  this.cs.change(this.title);
  }

   ngOnInit() {
    console.log('First page init');
    this.cs.nameChange.subscribe(value => {
      console.log('Test value', value);
      this.title = value;
    });
    const url = 'http://localhost:3000';
    this.http.get(url + '/carrier').subscribe((res) => {
      this.partner = res;
      console.log(this.partner.Post);
      this.partner.Post.forEach(element => {
        console.log(element);
        const obj  = {
          name: element.name,
          code : element._id
        };
        this.shippings.push(obj);
      });
    });
  }
  // function for going to next page on selecting one option
  onChange(event) {
    if (event.value === '5d1f3e0b1ef20e283824e990') {
      this._router.navigate(['/second'], {queryParams : {title: ''}});
     // this.cs.change('');
    } else if (event.value === '5d1f3df51ef20e283824e98f') {
      this._router.navigate(['/firstpage']);
    } else {
      return false;
    }
  }
}
