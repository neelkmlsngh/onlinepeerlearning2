//imports required from angular

import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {AuthenticationService} from '../shared/services/authentication.service'
//component decorator

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//home component class starts

export class HomeComponent implements OnInit {

@ViewChild('template')template: TemplateRef < any >;
  
  //modal config object
  
  public modalRef: BsModalRef;
  public configModal = {
   animated: true,
   keyboard: true,
   backdrop: true,
   ignoreBackdropClick: false
   };

  //constructor having modal service and router

  constructor(private modalService: BsModalService, private router: Router,private authenticationservice:AuthenticationService) {
  }

  //ngOnInit 

  ngOnInit() {
  }


  //open modal window 

  public openModalWithClass(template: TemplateRef < any > ) {
   this.modalRef = this.modalService.show(template, Object.assign({}, this.configModal, { class: 'gray modal-lg' }));
  }

  //config settings for ng2 fan menu

  public options :any = {
  "radius": "200",
  "buttonWidth": "60",
  "buttonBackgroundColor": "rgba(0,160,193,0.88)",
  "buttonFontSize": "14",
  "wingFontSize": "14",
  "angle": "38",
  "spinable": true,
  "defaultOpen": true,
      };

  public wings:any = [
    {
    "title": "Public Forum",
    "color": "rgba(7,213,10,0.76)",
    "icon": {
      "name": "fa fa-sign-in"
      }
    },
    {
    "title": "Github Login",
    "color": "rgba(232,77,7,0.85)",
    "icon": {
      "name": "fa fa-github"
      }
    },
    {
    "title": "Instructions",
    "color": "rgba(246,214,22,0.83)",
    "icon": {
      "name": "fa fa-bars"
      }
    }
  ]
  
  public gutter:any = {      
  "left": 100,
  "bottom": 300,
  "top": 90,
  "right": 80
  };
    
  public startAngles:any = {
  "topLeft": 0,
  "topRight": 0,
  "bottomRight": 100,
  "bottomLeft": 0
   }

  //method for click events on the wing options
  
  selectWing(event){
     if ((event.title)=='Public Forum') {
       this.router.navigate([''])
     }
     else if ((event.title)=='Github Login') {
            this.loginByGit();
     }
     else if ((event.title)=='Instructions') {
        this.openModalWithClass(this.template);
      }
     else{
       alert("Error")
     }
   }

   loginByGit() {
        this.authenticationservice.git()
            .subscribe((res) => {

                if (res)
                    this.router.navigate(["/"]).then(result => { window.location.href = res.url; });
                else
                    this.router.navigateByUrl('home')
            }, error => {
                console.log("Error" + error)
            })
    }
}
