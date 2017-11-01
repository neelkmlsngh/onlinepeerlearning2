import { Component, OnInit, Input, NgZone, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as $ from 'jquery';

import { config } from '../shared/config/config';
import { GitService } from '../shared/services/git.service'
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  content: any;
  languages: any = [];
  mod: any = 'html'
  githubUser: any;
  selectedValue: any;
  data: any;
  fileData: any;
  selectedfile: any;
  url: any = "";
  text: any = "enter code here";
  windowRef: any;
  methodToExport: any;
  link: string = '';
  public modalRef: BsModalRef;

  constructor(private gitService: GitService, private zone: NgZone, private modalService: BsModalService,private authenticationservice:AuthenticationService,private router:Router) {

    this.methodToExport = this.calledFromOutside;
    window['angularComponentRef'] = { component: this, zone: zone };

  }

  public openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  calledFromOutside(url: string) {
    this.zone.run(() => {
      this.link = url;
    });
  }



  ngOnInit() {
    this.languages = config.language;
    this.gitService.getRepos()
      .subscribe(repos => {
        this.githubUser = repos;

      })
  }


  reposearch(selected) {

    this.gitService.getTree(selected)
      .subscribe(data => {
        this.data = data

      })

  }

  showFile(reponame, filename) {
    this.gitService.openFolder(reponame, filename)
      .subscribe(
        data => {
          this.data = data
          this.url = this.url + filename + "/"

        }, err => {
          this.show(reponame, this.url + filename)
          this.url = "";

        })
  }

  show(reponame, filename) {
    this.gitService.getFile(reponame, filename)
      .subscribe(data => {

        this.fileData = data;
        this.text = this.fileData._body;
        this.content.emit(this.text);

      })
  }





  mode(event) {

    this.mod = event;
  }

  getcontent(text) {
    this.content = text;
  }

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
