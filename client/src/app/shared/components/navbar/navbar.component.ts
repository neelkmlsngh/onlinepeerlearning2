import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {AuthenticationService} from '../../../shared/services/authentication.service'
import swal from 'sweetalert2';
import { config } from '../../../config/config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ AuthenticationService ]
})
export class NavbarComponent implements OnInit {

  //constructor to create instance of services
  constructor( private router: Router,
    private authenticationservice :AuthenticationService) { }

  //ngOnInit method
  ngOnInit() {
  }

  //method to logout from github 
  logout(){ 
   let user = JSON.parse(localStorage.getItem('currentUser'));
   let userid = user.userId;
    user={
      userid:userid
     }
    this.authenticationservice.logoutEditor(user).subscribe((data1)=>{
    this.router.navigate(["/"]);
    localStorage.removeItem('currentUser');
    })
  }
}