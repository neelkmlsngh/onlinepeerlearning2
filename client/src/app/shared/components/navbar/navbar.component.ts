import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import {AuthenticationService} from '../../../shared/services/authentication.service'
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
      //We get dialog result
        if (data1) {
          swal({
      timer: 1000,
      title: "Preferences are set",
      text:  "accepted",
      type:  'success',
      showConfirmButton: false,
    })
        } else {
          swal({
      timer: 1000,
      title: "Preferences are not set",
      text:  "declined",
      type: 'error',
      showConfirmButton: false,
    })
        }
    this.router.navigate(["/"]);
     localStorage.removeItem('currentUser');
})
}
}
