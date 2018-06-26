import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
// import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[];
  celebs: any[];
  celebsFound: boolean = false;
  movieFound: boolean = false;

  handleSuccessCeleb(data) {
    this.celebsFound = true;
    this.celebs = data.faces[0].celebrity.slice(0, 3);
    this.movies = [];
    console.log(data.faces[0].celebrity);
  }

  handleSuccessMovie(data) {
    this.movieFound = true;
    this.movies = data.known_for;
    console.log(data.known_for);
  }

  handleError(error) {
    console.log(error);
  }

  constructor(private movieService: MovieService) { }

  searchCelebs(query: string) {
    return this.movieService.getCeleb(query).subscribe(
      data => this.handleSuccessCeleb(data),
      error => this.handleError(error),
      () => console.log('Request complete')
    );
  }

  searchMovies(query: string) {
    return this.movieService.getMovie(query).subscribe(
      data => this.handleSuccessMovie(data),
      error => this.handleError(error),
      () => console.log('Request Complete')
    );
  }

  ngOnInit() {
  }

}
