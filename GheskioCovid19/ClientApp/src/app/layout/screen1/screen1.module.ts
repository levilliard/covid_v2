import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Screen1Component } from './screen1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Screen1RoutingModule } from './screen1-routing.module';
import { GenericProvider } from '../../../app/providers/generic';

import {
  MatStepperModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatNativeDateModule
} from '@angular/material';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovidCrudComponent, DialogAdd } from './covid-crud/covid-crud.component';
import { CovidViewComponent, DialogEdit } from './covid-view/covid-view.component';

@NgModule({
  declarations: [Screen1Component, CovidCrudComponent, CovidViewComponent, DialogAdd, DialogEdit],
  imports: [
    CommonModule,
    Screen1RoutingModule,
    FormsModule,
    MatStepperModule,
    CdkStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],

  entryComponents: [DialogEdit, CovidViewComponent, DialogAdd],
  providers: [GenericProvider]
})
export class Screen1Module { }
