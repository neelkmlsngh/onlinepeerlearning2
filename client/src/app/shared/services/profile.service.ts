import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../config/config';

@Injectable()
export class ProfileService {
  config = config;
  constructor(private http: Http) {}


  // service method to get data of user using userid
  getDataFromDB(userId) {

    //url to get details from db
    const api = config.connect.url + config.connect.port + "/api/profile/" + userId
    return this.http
      .get(api)
      .map(res => res.json(), error => error.json());
  }

  // service method to upload image
  uploadFile(userId, formData, options) {

    // url to upload profile picture
    const api = config.connect.url + config.connect.port + "/api/profile/image/" + userId
    return this.http.put(api, formData, options)
      .map(res => res.json(), error => error.json());

  }
}
