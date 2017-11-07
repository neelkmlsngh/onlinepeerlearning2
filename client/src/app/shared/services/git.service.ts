import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as $ from 'jquery';

@Injectable()
export class GitService {
  accessToken: any;
  userName: any;

  constructor(private _http: Http) {
    let userDetails = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = userDetails.userName;
  }

//method to get github userName
 getUser() {
   if (this.userName) {
     return this._http.get(config.giturls.HOSTURLUSERS + this.userName +
         '?client_id=' + config.connect.CLIENT_ID +
         '&client_secret=' + config.connect.CLIENT_SECRET)
       .map(res => res.json())
       .catch(this.handleError);
   }
 }

  //method to get all the repositories of the user
  getRepos() {
    if (this.userName) {
      return this._http.get(config.giturls.HOSTURLUSERS + this.userName +
          '/repos?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }

  //method to list down all the repositories
  getTree(repo) {
    if (this.userName) {
      return this._http.get(config.giturls.HOSTURL + this.userName + "/" +
          repo + '/contents?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }

  //method to open the rpository and show all the file
  openFolder(repo, file) {
    if (this.userName) {
      let headers = new Headers({ 'accept': "application/vnd.github.VERSION.raw" });
      let options = new RequestOptions({ headers: headers });
      return this._http.get(config.giturls.HOSTURL + this.userName + "/" +
          repo + '/contents/' + file + '?client_id=' + config.connect.CLIENT_ID +
          '&client_secret=' + config.connect.CLIENT_SECRET, options)
        .map(res => res.json())
    }
  }

  //method to get file 
  getFile(repo, file) {
    if (this.userName) {
      let headers = new Headers({ 'accept': "application/vnd.github.VERSION.raw" });
      let options = new RequestOptions({ headers: headers });
      return this._http.get(config.giturls.HOSTURL + this.userName + "/" +
        repo + '/contents/' + file + '?client_id=' + config.connect.CLIENT_ID +
        '&client_secret=' + config.connect.CLIENT_SECRET, options)
    }
  }

  //method to create file on github
  createFile(text) {
    if (this.userName) {
      return this._http.get('https://api.github.com/repos/' + this.userName + '/' + text + '/git/refs/heads/master', this.authoriZation())
        .map(res => res.json())
    }
  }

  commitfile(text, sha) {
    if (this.userName) {
      return this._http.get('https://api.github.com/repos/' + this.userName + '/' + text + '/git/commits/' + sha, this.authoriZation())
        .map(res => res.json())
    }
  }

  treecommit(text, basetree) {
    if (this.userName) {
      return this._http.post('https://api.github.com/repos/' + this.userName + '/' + text + '/git/trees', basetree, this.authoriZation())
        .map(res => res.json())
    }
  }

  newcommit(text, newcommit) {
    if (this.userName) {
      return this._http.post('https://api.github.com/repos/' + this.userName + '/' + text + '/git/commits', newcommit, this.authoriZation())
        .map(res => res.json())
    }
  }

  //method to create a fiel on github 
  lastcommit(text, lastcommit) {
    if (this.userName) {
      return this._http.post('https://api.github.com/repos/' + this.userName + '/' + text + '/git/refs/heads/master', lastcommit, this.authoriZation())
        .map(res => res.json())
    }
  }

  //method to update the user
  updateUser(userName: string) {
    this.userName = userName;
  }

  //method to handle error
  private handleError(error: any) {
    if (error.status === 401) {
      return Observable.throw(error.status);
    } else {
      return Observable.throw(error.status || 'Server error');
    }
  }

  //method to get the sha of the file   
  getsha(text, filename) {
    if (this.userName) {
      return this._http.get(config.giturls.HOSTURL + this.userName + '/' + text + config.giturls.CONTENTURL + filename, this.authoriZation())
        .map(res => res.json())
    }
  }

  //method to update the file on github
  updateFile(text, filename, updateobj) {
    if (this.userName) {
      return this._http.put(config.giturls.HOSTURL + this.userName + '/' + text + config.giturls.CONTENTURL + filename, updateobj, this.authoriZation())
        .map(res => res.json())
    }
  }

  //method to delete the file on github
  deleteFile(text, filename, deletefileobj) {
    if (this.userName) {
      let headers = new Headers({ 'Authorization': config.giturls.AUTHORIZATION });
      return this._http.delete(config.giturls.HOSTURL + this.userName + '/' + text + config.giturls.CONTENTURL + filename, new RequestOptions({
          headers: headers,
          body: deletefileobj
        }))
        .map(res => res.json())
    }
  }

  //method to create user personal access token
  createToken(credentials, password) {
    if (this.userName) {
      return this._http.post('https://api.github.com/authorizations', credentials, this.authorizationToken(this.userName, password))
        .map(res => res.json())
    }
  }

  //method to create Repository on github
  createRepos(text, accessToken) {
    this.accessToken = accessToken
    if (this.userName) {
      return this._http.post(config.giturls.CREATEREPOS, text, this.authorization(this.accessToken))
        .map(res => res.json())
    }
  }

  //method for authorization for creating new repository
  private authorization(accessToken) {
    let headers = new Headers({ 'Authorization': "Basic " + accessToken });
    return new RequestOptions({ headers: headers });
  }

//method for authorization for creating personal access token
 private authorizationToken(username, password) {
   let data = btoa(username + ':' + password)
   let headers = new Headers({ "Authorization": "Basic " + data });
   return new RequestOptions({ headers: headers })
 }

  //method for authorization

  private authoriZation() {
    let headers = new Headers({ 'Authorization': config.giturls.AUTHORIZATION });
    return new RequestOptions({ headers: headers });
  }
}

