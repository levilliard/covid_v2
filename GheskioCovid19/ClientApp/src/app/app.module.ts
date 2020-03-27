import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MAT_DATE_LOCALE,
    NativeDateAdapter, 
    MAT_DATE_FORMATS,
    DateAdapter
} from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export class AppDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {

        if (displayFormat === 'input') {
            return date.toISOString().split("T")[0];
        } else {
            return date.toDateString();
        }
    }
}

//[1]
export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        NoopAnimationsModule,
        
    ],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
