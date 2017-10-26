import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
@Injectable()
export class LoginService {

  constructor(private http:Http) { }
  git() {
    const url ="https://localhost:8080/auth/github"
    return this.http
      .get(url)
      .map(res => res, error => error.json());
  }
}

