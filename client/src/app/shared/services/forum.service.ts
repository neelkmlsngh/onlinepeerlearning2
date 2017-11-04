import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
import { RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { forumConfig } from './../config/forum'
import { config } from './../config/config'
@Injectable()
export class ForumService {

  constructor(private http: Http, private autheticationservice: AuthenticationService) {}

  config=config;
  forumConfig=forumConfig;

  ngOnInit() {} //method is used to hit api on express server and post the data of form in database     
  
  save(data: any) {
    return this.http.
    post(forumConfig.forumUrls.FORUMURL+config.forumConnect.APIURL, data)
      .map(res => res.json());
  }

  getPost() {
    return this.http
      .get(forumConfig.forumUrls.FORUMURL+config.forumConnect.APIURL)
      .map(res => res.json());
  }

  searchEntries(searchTerm: any) {

    if (searchTerm != "") {
      var api = forumConfig.forumUrls.FORUMURL+config.forumConnect.APIURL + searchTerm
      return this.http
        .get(api)
        .map(res => res.json());

    } else {
      return this.http
        .get(forumConfig.forumUrls.FORUMURL+config.forumConnect.APIURL)
        .map(res => res.json());
    }
  }
  /*getEmployeeByID method to fetch details by id used in supervisor component*/
  getPostByQuestion(id : string) {
    return this.http.
    get(forumConfig.forumUrls.FORUMURL+config.forumConnect.APIURL + id)
      .map(res => res.json());
  }


  // showAnswer(question: string) {
  //   return this.http
  //     .post('https://localhost:8080/api/forum/answer/' + )
  //     .map(res => res.json());
  // }
  saveAnswer(question,answer){
    console.log(answer);
     return this.http.
     put(forumConfig.forumUrls.FORUMURL+config.forumConnect.APIURL + question,answer)
      .map(res => res.json());

}



  private authoriZation() {
    let token = this.autheticationservice.getToken();
    if (token) {
      let headers = new Headers({ 'Authorization': token });
      return new RequestOptions({ headers: headers });
    }
  }




}
