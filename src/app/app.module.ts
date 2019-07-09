// author shambhu:-10/06/2019
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule,
   MatFormFieldModule,
   MatSelectModule,
    MatToolbarModule,
    MatOptionModule,
    MatInputModule,
    MatCardModule,
      MatProgressBarModule,
      MatRadioButton,
      MatButtonModule,
      MatRadioModule,
      MatIconModule} from '@angular/material';
import { CoreModule } from './cores/cores.module';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { AgmCoreModule } from '@agm/core';
import { HeaderComponent } from './cores/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SecondComponent } from './second/second.component';
import { ReactiveFormsModule, NgControl, FormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    SecondComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule,
  MatOptionModule,
  MatInputModule,
  MatCardModule,
  MatProgressBarModule,
  MatRadioModule,
  ReactiveFormsModule,
  FormsModule,
  MatButtonModule,
  MatIconModule,
    CoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCmJmzIxoQkKZlqGvJte9xBFOaSwyVTHyo',
      libraries: ['places']
    })
  ],
  providers: [HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
