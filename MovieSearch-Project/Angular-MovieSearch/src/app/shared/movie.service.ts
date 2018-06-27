import { Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {map} from 'rxjs/internal/operators';


@Injectable()
export class MovieService {
  value;

  constructor(private http: Http) {}

  getCeleb(query: string) {
    const userInput = (<HTMLInputElement>document.getElementById(query)).value;
    const body = new URLSearchParams();
    this.value = userInput;
    body.set('url', this.value);
    return this.http.post('/Celebrity/', body)
      .pipe(map(res => res.json()));
  }

  getMovie(query: string) {
    const body = new URLSearchParams();
    body.set('name', query);
    return this.http.post('/Movie/', body)
      .pipe(map(res => res.json()));
  }

}
