import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../config/config';

@Injectable()
export class ProfileService {
 config = config;
  constructor(private http:Http) { }

 // method to get data of user using uiserid
  getDataFromDB(userId){
   	const api="https://localhost:8080/api/profile/"+userId
   return this.http
      .get(api)
      .map(res => res.json(),error=>error.json());
  }

  uploadFile(userId,formData,options){
    const api="https://localhost:8080/api/profile/image/"+userId

    return this.http.put(api,formData,options)
    .map(res => res.json(),error=>error.json());
  }
}
