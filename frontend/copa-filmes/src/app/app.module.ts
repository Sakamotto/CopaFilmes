import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmesComponent } from './filmes/filmes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { FilmesService } from './filmes/filmes.service';
import { FinalCampeonatoComponent } from './final-campeonato/final-campeonato.component';
import { BannerComponent } from './shared-components/banner/banner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    FilmesComponent,
    FinalCampeonatoComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [FilmesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
