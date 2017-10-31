import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { config } from '../config/config';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions, Request, RequestMethod, Headers } from '@angular/http';

@Injectable()
export class AuthenticationService {
  config = config;
  constructor(private http: Http, private router: Router) {}

user:{}

  git() {

    return this.http
      .get(this.config.connect.url + this.config.connect.port + '/auth/github')
      .map(res => res, error => error.json());
  }

  setUserInfo(userId, token) {
    //console.log(dataObj.userId);
    localStorage.setItem('currentUser', JSON.stringify({ token: token, userId: userId }));
    if (token) {
      this.router.navigate(["/main"]);

    } else if (!token) {
      this.router.navigate(["/"])

    }
  }

  getToken(): any {
    let userDetails = JSON.parse(localStorage.getItem('currentUser'));
    let token=userDetails.token;
console.log('token',token)
    return token;
  }

  logoutEditor(user) {
    // alert('logout called')
    // let user = JSON.parse(localStorage.getItem('currentUser'));
    
    // let userid = user.userId
    // user={
    //   userid:userid
    // }
     localStorage.removeItem('currentUser');
     return this.http
      .put(this.config.connect.url + this.config.connect.port +'/logout',user)
      .map(res => res, error => error.json());
   

    
  }

  private authoriZation() {
    let token = this.getToken()
    if (token) {
      let headers = new Headers({ 'Authorization': token });
      return new RequestOptions({ headers: headers });
    }
  }
}
