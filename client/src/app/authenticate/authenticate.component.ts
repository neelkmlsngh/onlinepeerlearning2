import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let userId = this.route.snapshot.params['userId'];
     let token = this.route.snapshot.params['token'];
    console.log(userId+" "+token);
    this.setUserInfo(userId,token);
  }
  setUserInfo(userId,token) {
  //console.log(dataObj.userId);
    localStorage.setItem('currentUser', JSON.stringify({ token: token, userId: userId }));
    if(token){
    this.router.navigate(["/main"])
    }
    else{
       this.router.navigate(["/"])
    }
  }



}
