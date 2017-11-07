import { Component, OnInit, Input, NgZone, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { config } from '../shared/config/config';
import { GitService } from '../shared/services/git.service'
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileService } from '../shared/services/profile.service';
import { mainConfig } from '../shared/config/main.config';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {


  content: any;
  reponame: any;
  filenamed: any;
  languages: any = [];
  mode: any = 'html';
  githubUser: any;
  selectedValue: any = "html";
  data: any;
  fileData: any;
  selectedfile: any;
  url: any = "";
  text: any = "enter code here";
  windowRef: any;
  methodToExport: any;
  link: string = '';
  value: any;
  accessToken: any;
  public modalRef: BsModalRef;
  currentUser: any;
  user: {}
  config = mainConfig;
  personalAccessToken: string;

  constructor(private gitService: GitService, private zone: NgZone, private modalService: BsModalService,
   private authenticationService: AuthenticationService, private router: Router, private profileService: ProfileService) {

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
        this.mode = "html"

      })
  }

  reposearch(selected) {
    this.reponame = selected;
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
    this.reponame = reponame;
    this.filenamed = filename;

    this.gitService.getFile(reponame, filename)
      .subscribe(data => {
        this.fileData = data;
        this.text = this.fileData._body;
        this.content = this.text;
      })
  }

  changeMode() {
    this.mode = this.selectedValue;
  }

  getcontent(text) {
    this.content = text;
  }

  getfilename(filename) {
    this.filenamed = filename;
  }


  getreponame(reponame) {
    this.reponame = reponame;

  }


  //method for logout
  logout() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let userId = user.userId;
    user = {
      userId: userId
    }
    this.authenticationService.logoutEditor(user).subscribe((data1) => {
      if (data1.status == 200) {
        swal({
          timer: 2500,
          title: "Logged Out Successfully",
          text: "",
          type: 'success',
          showConfirmButton: false,
        })
      }
      this.router.navigate(["/"]);
      localStorage.removeItem('currentUser');
    })
  }

  onKey(event) {
    this.value += event
  }

  //method generate personal access token for new user
  createAccessToken(password, tokenName) {
    let cred = {
      "scopes": [
        "repo"
      ],
      "note": tokenName
    }
    this.gitService.createToken(cred, password)
      .subscribe(data => {
        this.accessToken = data.token;
        this.authenticationService.pacToken=data.token;
        this.storeToken(this.accessToken)
      })
  }

  //method to store personal access token into database
  storeToken(token) {
    let accessToken = {
      "token": token
    }
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = currentUser.userId;
    this.profileService.storeAccessToken(userId, accessToken)
      .subscribe(response => {
      })
  }
}
