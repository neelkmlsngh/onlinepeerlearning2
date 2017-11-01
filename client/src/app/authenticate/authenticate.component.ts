import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service'
@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,private authenticationservice:AuthenticationService
  ) {}
obj:any
  ngOnInit() {

   //this.authenticationservice.getToken();
    let userId = this.route.snapshot.params['userId'];
     let token = this.route.snapshot.params['token'];
     let name=this.route.snapshot.params['name'];
     this.obj={
       userId:userId,
       token:token,
       name:name

     }
    this.authenticationservice.setUserInfo(this.obj);
    
  }
}
