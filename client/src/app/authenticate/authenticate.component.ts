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

  ngOnInit() {
   //this.authenticationservice.getToken();
    let userId = this.route.snapshot.params['userId'];
     let token = this.route.snapshot.params['token'];
    //console.log(userId+" "+token);
    this.authenticationservice.setUserInfo(userId,token);
    
  }



}
