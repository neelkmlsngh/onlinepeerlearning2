import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GitService {
 userName:any;
 username:any="ROZYTYAGI"
  private clientId: string = '60b9f23dedffbdfc476c';
  private clientSecret: string = 'd1c186c6373f96571c0bfcf76b84e4dc6fd0c15a';
  constructor(private _http: Http) {
    // console.log('Github Service Ready.');
    let userDetails = JSON.parse(localStorage.getItem('currentUser'));
    this.userName =userDetails.userName ;
  }

  //method to get github username
  getUser() {
    if (this.userName) {
      console.log(this.userName)
      return this._http.get('https://api.github.com/users/' + this.userName +
          '?client_id=' + this.clientId +
          '&client_secret=' + this.clientSecret)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }

  //method to get all the repositories of the user
  getRepos() {
    if (this.userName) {
      return this._http.get('https://api.github.com/users/' + this.userName +
          '/repos?client_id=' + this.clientId +
          '&client_secret=' + this.clientSecret)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }
  getTree(repo) {
    if (this.userName) {
      return this._http.get('https://api.github.com/repos/' + this.userName + "/" +
          repo + '/contents?client_id=' + this.clientId +
          '&client_secret=' + this.clientSecret)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }
  openFolder(repo, file) {
    if (this.userName) {
      let headers = new Headers({ 'accept': "application/vnd.github.VERSION.raw" });
      let options = new RequestOptions({ headers: headers });
      return this._http.get('https://api.github.com/repos/' + this.userName + "/" +
          repo + '/contents/' + file + '?client_id=' + this.clientId +
          '&client_secret=' + this.clientSecret, options)
        .map(res => res.json())
    }
  }
  getFile(repo, file) {
    if (this.userName) {
      let headers = new Headers({ 'accept': "application/vnd.github.VERSION.raw" });
      let options = new RequestOptions({ headers: headers });
      return this._http.get('https://api.github.com/repos/' + this.userName + "/" +
        repo + '/contents/' + file + '?client_id=' + this.clientId +
        '&client_secret=' + this.clientSecret, options)
    }
  }

  //method to create file on github
  createFile(text) {
    if (this.userName) {
      /*let headers = new Headers({ 'Authorization': "Basic dGFudXByZWV0X3NpbmdoQHlhaG9vLmNvbTo4NTI3NDc5MDMyMGZiMzNmYzkxNzhmZTA4NWE4YTA2NjVmZDNiNTU4" });
   let options= new RequestOptions({ headers: headers });*/
      return this._http.get('https://api.github.com/repos/' + this.userName + '/' + text + '/git/refs/heads/master', this.authorization())
        .map(res => res.json())
    }
  }

  //method to create the file and saving the sha-base-tree
  commitfile(text, sha) {
    if (this.userName) {
      return this._http.get('https://api.github.com/repos/' + this.userName + '/' + text + '/git/commits/' + sha, this.authorization())
        .map(res => res.json())
    }
  }

  //method to create file, sending new file name and saving the sha-new-tree
  treecommit(text, basetree) {
    if (this.userName) {
      return this._http.post('https://api.github.com/repos/' + this.userName + '/' + text + '/git/trees', basetree, this.authorization())
        .map(res => res.json())
    }
  }

  //method to create a file on github and saving sha-new-commit
  newcommit(text, newcommit) {
    if (this.userName) {
      return this._http.post('https://api.github.com/repos/' + this.userName + '/' + text + '/git/commits', newcommit, this.authorization())
        .map(res => res.json())

    }
  }

  //method to create a fiel on github 
  lastcommit(text, lastcommit) {
    if (this.userName) {
      return this._http.post('https://api.github.com/repos/' + this.userName + '/' + text + '/git/refs/heads/master', lastcommit, this.authorization())
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
      console.log(filename)
      return this._http.get('https://api.github.com/repos/' + this.userName + '/' + text + '/contents/' + filename, this.authorization())
        .map(res => res.json())

    }
  }

  
  //method to update the file on github
  updateFile(text, filename, updateobj) {
    if (this.userName) {
      console.log('from service...........' + updateobj)
      return this._http.put('https://api.github.com/repos/' + this.userName + '/' + text + '/contents/' + filename, updateobj, this.authorization())
        .map(res => res.json())
    }
  }

  //method to delete the file on github
  deleteFile(text, filename, deletefileobj) {
    if (this.userName) {
      //let head=this.authoriZation();  
      let headers = new Headers({ 'Authorization': "Basic YWFzdGhhd2FkaHdhMDFAZ21haWwuY29tOjcwZWJjMzgyMTJkZTJkZThjMzgwNGNlYmZhNDNkMWI4MWIzZjc4YjU=" });
      console.log('from service...........' + deletefileobj)
      return this._http.delete('https://api.github.com/repos/' + this.userName + '/' + text + '/contents/' + filename, new RequestOptions({
          headers: headers,
          body: deletefileobj
        }))
        .map(res => res.json())
    }
  }


  //method to create Repository on github
  createRepos(text) {
    if (this.username) {
      return this._http.post('https://api.github.com/user/repos', text, this.authorization())
        .map(res => res.json())
    }
  }

   //method for authorization for creating new repository
  private authorization() {
    let headers = new Headers({ 'Authorization': "Basic Uk9aWVRZQUdJOjIwYWRiMGI1MTJmMTIyYjM0YTc1NzRmODQyMGNiZjYxYmMyZTMzODU=" });
    return new RequestOptions({ headers: headers });
  }
}
