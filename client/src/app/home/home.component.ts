//imports required from angular
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Router } from '@angular/router';
import {LoginService} from './service/login.service'
//component decorator
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//home component class starts
export class HomeComponent implements OnInit {
  //modal config object
  public modalRef: BsModalRef;
  public configModal = {
   animated: true,
   keyboard: true,
   backdrop: true,
   ignoreBackdropClick: false
   };
  //constructor having modal service
  constructor(private modalService: BsModalService,private router: Router,private loginservice: LoginService) {
  }
  //ngOnInit 
  ngOnInit() {
  }
  //open modal window 
  public openModalWithClass(template: TemplateRef < any > ) {
   this.modalRef = this.modalService.show(template, Object.assign({}, this.configModal, { class: 'gray modal-lg' }));
  }

  loginByGit() {
    this.loginservice.git()
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
