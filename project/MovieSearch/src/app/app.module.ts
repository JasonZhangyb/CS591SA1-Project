import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';

import { MovieService } from './shared/movie.service';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MovieService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
