import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  getAuthStatus() {
    return this.http.get('/check')
      .pipe(map((res => res.json())));
  }
}
