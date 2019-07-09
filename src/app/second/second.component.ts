// Author Shambhu:-14/06/2019
// second page components
import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject } from '@angular/core';
import { ParcelType } from '../frontpage/frontpage.component';
import { MapsAPILoader } from '@agm/core';
import { } from 'google-maps';
import { HeaderComponent } from '../cores/components/header/header.component';
import { CommanserviceService } from '../commanservice.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  @ViewChild('search', { static: false }) public searchElement: ElementRef;

  @ViewChild('searchTo', { static: false }) public searchTo: ElementRef;

  public isDimentionalVisible: any;
  progress = 10;
  parcelType: ParcelType[] = [];
  public parcel: any;
  notificationTypeFc = new FormControl('', Validators.required);
  sty = new FormControl('', Validators.required);

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, @Inject(HeaderComponent)
// tslint:disable-next-line: align
  private parent: HeaderComponent, private cs: CommanserviceService, private http: HttpClient) { }

  onChange(event) {
    console.log('code===', event);
    if (event.value === 'nd') {
        this.isDimentionalVisible = true;
    } else {
      this.isDimentionalVisible = false;
    }
  }


  ngOnInit() {
    this.cs.change('');
    const url = 'http://localhost:3000';

    this.http.get(url + '/parcelType').subscribe((res) => {
      this.parcel = res;
      this.parcelType = this.parcel.parcelType;
    });
    this.mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
    this.add();
  }
  add() {
    this.mapsAPILoader.load().then(
      () => {

        const autocomplete = new google.maps.places.Autocomplete(this.searchTo.nativeElement, { types: ['address'] });

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }
}
