import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
	this.authenticationservice.logout();

}
}
