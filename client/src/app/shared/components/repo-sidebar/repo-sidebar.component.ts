import { Component, OnInit, Output, Input, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import swal from 'sweetalert2';

import * as $ from 'jquery';

/*import third party libraries*/
import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service';
import { config } from './../../config/repoSidebar.config';
import { ProfileService } from '../../services/profile.service'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-repo-sidebar',
  templateUrl: './repo-sidebar.component.html',
  styleUrls: ['./repo-sidebar.component.css']
})

export class RepoSidebarComponent implements OnInit {

  @Input() mode: String;
  @Input() githubUser: any;
  @Input() repoNameForFileUpdate: string;

  config = config;
  /*declaring all the required variables*/
  selectedValue: any;
  reponamed: any;
  filenamed: any;
  data: any;
  fileData: any;
  selectedfile: any;
  url: any = "";
  text: any = config.repoSidebar.ENTER_CODE;
  public modalRef: BsModalRef;
  value: any;
  accessToken: any;
  data1: any;
  currentUser: any;
  isTree: Boolean = true;
  public emptyRepo: String;
  extension: any;
  confirm: any;
  folder: any;
  filename: string

  folderDetails: string;


  // @Input() personalAccessToken;
  @Output() content = new EventEmitter < any > ();
  @Output() repoName = new EventEmitter < any > ();
  @Output() fileName = new EventEmitter < any > ();
  @Output() editorMode = new EventEmitter < any > ();

  constructor(private editorService: EditorService, private gitService: GitService,
    private modalService: BsModalService, private profileService: ProfileService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    console.log("===========++++++++++++++++++++++" + this.repoNameForFileUpdate)
    this.gitService.getTree(this.repoNameForFileUpdate)
      .subscribe(data => {
        this.isTree = true;
        this.data = data;
        this.repoName.emit(this.repoNameForFileUpdate);
      }, err => {
        this.isTree = false;
        if (err === 404)
          this.emptyRepo = config.repoSidebar.EMPTY_REPO;
      })
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.authenticationService.getPersonalAccessToken(this.currentUser.userId)
      .subscribe((res) => {
        this.authenticationService.pacToken = res.data.accessToken;

      })
  }

  public openRepoModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }
  public openTokenModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

  getDirectoryContent() {
    this.reponamed = this.selectedValue;
    this.gitService.getFolderContents(this.reponamed)
      .subscribe(repo => {
        this.folderDetails = repo;
        this.repoName.emit(this.reponamed);
      })
  }

  getFolderInfo($event: any) {
    let eleId = $event.target.id;
    if (eleId) {
      $('#' + eleId + ' ol').remove()
      $('#' + eleId + ' li').remove()

      let folderValue = $event.target.innerText
      let path = $event.target.dataset.path;
      this.gitService.openFolder(path, this.reponamed).subscribe(folder => {
        folder.map((ele, index) => {
          if (ele.type === 'dir') {
            return this.appendDir(ele.name, eleId, index, ele.path);
          } else if (ele.type === 'file') {
            return this.appendFile(ele.name, eleId, index, ele.path);
          }
        })
      })
    } else {

      this.getFile($event);
    }

  }

  appendDir(name, id, index, path) {

    $('#' + id).append(`<ol id= ${name}${index} data-path=${path} (click)="getInfo($event)" style="list-style-type:none;">
    <i class="fa fa-caret-down" aria-hidden="true"></i>&nbsp;<i class="fa fa-folder-open" aria-hidden="true"></i> &nbsp; ${name} </ol>`);
  }

  appendFile(name, id, index, path) {
    $('#' + id).append(`<li (click)="getFile($event)" data-path=${path} data-filename=${name} style="list-style-type:none;">
      <i class="fa fa-file" aria-hidden="true"></i> &nbsp; ${name}
    </li>`);

  }

  getFile($event) {

    this.filename = $event.target.dataset.filename;
    let path = $event.target.dataset.path;

    this.gitService.getFileData(path, this.reponamed).subscribe(data => {

      this.extension = this.filename.split('.').pop();
      this.folder = this.filename.split('.');
      if (this.folder.length > 1) {
        if (this.extension !== "js" && this.extension !== "html" && this.extension !== "css") {
          alert(config.repoSidebar.NO_EXT)
        } else if (this.mode === "javascript" && this.extension !== "js" && this.extension !== "md" && this.extension !== "json" && this.extension !== "gitignore" && this.extension !== "ts" && this.extension !== "txt") {
          this.confirm = confirm(config.repoSidebar.HTML_MODE)
          if (this.confirm === true) {
            this.mode = "html"
            this.editorMode.emit(this.mode);
          }
        } else if (this.mode === "javascript" && this.extension == "js") {
          this.confirm = confirm(config.repoSidebar.ASK_MODE)
          if (this.confirm === true) {
            this.mode = "javascript"
            this.editorMode.emit(this.mode);
          } else {
            this.mode = "html"
            this.editorMode.emit(this.mode);
          }

        } else if (this.mode === "html" && this.extension !== "html" && this.extension !== "css" && this.extension !== "md" && this.extension !== "json" && this.extension !== "gitignore" && this.extension !== "ts" && this.extension !== "txt") {
          this.confirm = confirm(config.repoSidebar.JAVASCRIPT_MODE)
          if (this.confirm === true) {
            this.mode = "javascript"
            this.editorMode.emit(this.mode);
          }
        }
      }

      this.fileData = data;
      this.text = atob(data.content);
      this.content.emit(this.text);
      this.repoName.emit(this.reponamed);
      this.fileName.emit(this.filename);


    })
  }


}
