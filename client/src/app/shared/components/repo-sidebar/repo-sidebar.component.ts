import { Component, OnInit, Output, Input, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

/*import third party libraries*/
import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service';
import { config } from './../../config/repoSidebar.config';
import { ProfileService } from '../../services/profile.service'

@Component({
  selector: 'app-repo-sidebar',
  templateUrl: './repo-sidebar.component.html',
  styleUrls: ['./repo-sidebar.component.css']
})

export class RepoSidebarComponent implements OnInit {
  config = config;
  /*declaring all the required variables*/
  githubUser: any;
  selectedValue: any;
  reponamed: any;
  filenamed: any;
  data: any;
  fileData: any;
  selectedfile: any;
  url: any = "";
  text: any = config.repoSidebar.entercode;
  public modalRef: BsModalRef;
  value: any;
  accessToken: any;
  data1: any;
  currentUser: any;

  @Input() personalAccessToken;
  @Output() content = new EventEmitter < any > ();
  @Output() repoName = new EventEmitter < any > ();
  @Output() fileName = new EventEmitter < any > ();

  constructor(private editorService: EditorService, private gitService: GitService, private modalService: BsModalService, private profileService: ProfileService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.profileService.getDataFromDB(this.currentUser.userId)
      .subscribe((res) => {
        this.data1 = {
          accessToken: res.data.accessToken
        }
        this.data1 = this.data1.accessToken
      })

    this.gitService.getRepos()
      .subscribe(repos => {
        this.githubUser = repos;

      })
  }

  public openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  /*calling method to search repositery*/
  reposearch() {
    this.reponamed = this.selectedValue;
    this.gitService.getTree(this.selectedValue)
      .subscribe(data => {
        console.log('data------------------')
        console.log(data)
        this.data = data;
        this.repoName.emit(this.reponamed);
      }, err =>{
        console.log('err------------------')
        console.log(err)
      })
  }

  /*method used to show repositery name and file name*/
  showFile(reponame, filename) {
    this.reponamed = this.selectedValue;
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

  //method used to show content of file present in repository
  show(reponame, filename) {
    this.reponamed = reponame;
    this.filenamed = filename;
    this.gitService.getFile(reponame, filename)
      .subscribe(data => {
        this.fileData = data;
        this.text = this.fileData._body;
        this.content.emit(this.text);
        this.repoName.emit(this.reponamed);
        this.fileName.emit(this.filenamed);

      })
  }

  //method to enter new repository name
  onKey(event) {
    this.value += event
  }

  //method for creating new repository
  createRepo(name, desc) {
    let repoName = {
      "name": name,
      "description": desc,
      "homepage": "https://github.com",
      "private": false,
      "has_issues": false,
      "has_projects": false,
      "has_wiki": false
    }
    if (this.data1 == null) {
      this.data1 = this.personalAccessToken;
    } else {
      this.data1 == this.data1;
    }

    this.gitService.createRepos(repoName, this.data1)
      .subscribe(data => {})
  }

}
