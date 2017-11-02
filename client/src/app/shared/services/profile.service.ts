import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../config/config';

@Injectable()
export class ProfileService {
 config = config;
 constructor(private http:Http) { }

 // service method to get data of user using uiserid
  getDataFromDB(userId){
   const api=config.connect.url+config.connect.port+"/api/profile/"+userId //url to get details fron db
   return this.http
   .get(api)
   .map(res => res.json(),error=>error.json());
  }

 // service method to upload image
  uploadFile(userId,formData,options){
    const api=config.connect.url+config.connect.port+"/api/profile/image/"+userId // url to upload profile picture
    return this.http.put(api,formData,options)
    .map(res => res.json(),error=>error.json());
  }
}
