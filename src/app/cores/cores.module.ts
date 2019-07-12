import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
// tslint:disable-next-line: max-line-length
import { MatProgressBarModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule } from '@angular/material';

@NgModule ({
imports: [
  CommonModule,
  RouterModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatIconModule
],
providers: [],
declarations: [
  HeaderComponent,
  FooterComponent
],
exports: [
  HeaderComponent,
  FooterComponent
]
})
export class CoreModule {}
