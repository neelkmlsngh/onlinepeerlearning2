import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SnippetService {


  constructor(private http: Http) { }


 /* method used to Add snippet*/ 
  addSnippet(data) {
    return this.http
      .post('https://localhost:8080/api/snippet',data)
      .map(res => res.json());
  }

 /* method  to get snippet from database and show it into editor*/ 
    getSnippet() {
    return this.http
      .get('https://localhost:8080/api/snippet')
      .map(res => res.json());
  }

   /*update method used to modify snippet*/ 
     updateSnippet(title , code) {    
         return this.http    
          .put('https://localhost:8080/api/forum/update/' + title, code)   
            .map(res => res.json()); 
             }

              /*method to Remove snippet*/ 
     deleteSnippet(title) {    
         return this.http    
          .put('https://localhost:8080/api/forum/delete/' , title)   
            .map(res => res.json()); 
             }


}
