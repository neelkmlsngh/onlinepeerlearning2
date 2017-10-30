import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ForumService {

  constructor(private http: Http) {}

  ngOnInit() {} //method is used to hit api on express server and post the data of form in database     
  save(data: any) {
    return this.http.
    post('https://localhost:8080/api/forum', data)
      .map(res => res.json());
  }

  getPost() {
    return this.http
      .get('https://localhost:8080/api/forum')
      .map(res => res.json());
  }

  searchEntries(searchTerm: any) {

    if (searchTerm != "") {
      var api = 'https://localhost:8080/api/forum/' + searchTerm
      return this.http
        .get(api)
        .map(res => res.json());

    } else {
      return this.http
        .get('https://localhost:8080/api/forum')
        .map(res => res.json());
    }
  }
  /*getEmployeeByID method to fetch details by id used in supervisor component*/
  getPostByQuestion(question: string) {
    return this.http.
    get('https://localhost:8080/api/forum/getQuestionDetail/' + question)
      .map(res => res.json());
  }
}
