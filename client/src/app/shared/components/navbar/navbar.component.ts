import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../../../shared/services/authentication.service'
import swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router,private authenticationservice :AuthenticationService) { }

  ngOnInit() {
  }
logout(){ 
 let user = JSON.parse(localStorage.getItem('currentUser'));
    
    let userid = user.userId
    user={
      userid:userid
    }
     
		this.authenticationservice.logoutEditor(user).subscribe((data1)=>{
      swal({
            timer: 2000,
            title: "Successfully Logged Out",
            type: 'success',
            showConfirmButton: false,
          })
    this.router.navigate(["/"]);
     localStorage.removeItem('currentUser');
})
}
}
