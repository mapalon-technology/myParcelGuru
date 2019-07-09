// Author Swapnil :-14/06/2019
import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute, UrlTree } from '@angular/router';
import { CommanserviceService } from '../commanservice.service';


import {Location} from '@angular/common';
export interface ParcelType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
// tslint:disable-next-line: variable-name

title: any;
// tslint:disable-next-line: variable-name
constructor( private _router: Router,  private _route: ActivatedRoute, private cs: CommanserviceService, private location: Location) {

 }
  ngOnInit() {
    this._route.params.subscribe(value => {
      console.log(value);
      if (this._route.snapshot.queryParams.title) {
        this.title = this._route.snapshot.queryParams.title;
        console.log(this.title);
        this.cs.change(this.title);
      }
  });

// tslint:disable-next-line: prefer-const
    let urlTree: UrlTree = this._router.createUrlTree([], {
      queryParams: { title: 'Shipping Partner' },
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
    this.location.go('urlTree');
  }
  }



