import { Component, OnInit, Output, Input, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import swal from 'sweetalert2';

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
  @Input() githubUser:any;
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


  // @Input() personalAccessToken;
  @Output() content = new EventEmitter < any > ();
  @Output() repoName = new EventEmitter < any > ();
  @Output() fileName = new EventEmitter < any > ();
  @Output() editorMode = new EventEmitter < any > ();

  constructor(private editorService: EditorService, private gitService: GitService,
    private modalService: BsModalService, private profileService: ProfileService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
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

  /*calling method to search repositery*/
  reposearch() {
    this.reponamed = this.selectedValue;
    this.gitService.getTree(this.selectedValue)
      .subscribe(data => {
        this.isTree = true;
        this.data = data;
        this.repoName.emit(this.reponamed);
      }, err => {
        this.isTree = false;
        if (err === 404)
          this.emptyRepo = config.repoSidebar.EMPTY_REPO;
      })
  }

  /*Method to send data after swell executes to editor*/
  swelldata(reponame, filename) {
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

  /*method used to show repositery name and file name*/
  showFile(reponame, filename) {
    this.extension = filename.split('.').pop();
    this.folder = filename.split('.');
    if (this.folder.length > 1) {
      if (this.extension !== "js" && this.extension !== "html" && this.extension !== "css") {
        swal({
          timer: 8500,
          title: config.repoSidebar.NO_EXT,
          text: "",
          type: 'error',
          showConfirmButton: true,
        }).then(() => {
          this.swelldata(reponame, filename);

        })
      }

      if (this.mode === "javascript" && this.extension !== "js" && this.extension !== "md" && this.extension !== "json" && this.extension !== "gitignore" && this.extension!=="ts" && this.extension!=="txt") {
        /*this.confirm = confirm(config.repoSidebar.HTML_MODE) 
        if (this.confirm === true) {
          this.mode = "html"
          this.editorMode.emit(this.mode);
        }*/
        swal({
          text: config.repoSidebar.HTML_MODE,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'CANCEL',
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false
        }).then(() => {

          this.mode = "html"
          this.editorMode.emit(this.mode);
          this.swelldata(reponame, filename);

        })
      } else if (this.mode === "javascript" && this.extension == "js") {
        /* this.confirm = confirm(config.repoSidebar.ASK_MODE)
        if (this.confirm === true) {
          this.mode = "javascript"
          this.editorMode.emit(this.mode);
        } else {
          this.mode = "html"
          this.editorMode.emit(this.mode);
        }
*/
        swal({
          text: config.repoSidebar.ASK_MODE,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'CANCEL'
        }).then(() => {
          this.mode = "javascript"
          this.editorMode.emit(this.mode);
          this.swelldata(reponame, filename);

        }, function(dismiss) {
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
          if (dismiss === 'cancel') {
            this.mode = "html"
            this.editorMode.emit(this.mode);
            this.swelldata(reponame, filename);
          }
        })

      } else if (this.mode === "html" && this.extension !== "html" && this.extension !== "css" && this.extension !== "md" && this.extension !== "json" && this.extension !== "gitignore" && this.extension!=="ts" && this.extension!=="txt") {
        /*this.confirm = confirm(config.repoSidebar.JAVASCRIPT_MODE)
        if (this.confirm === true) {
          this.mode = "javascript"
          this.editorMode.emit(this.mode);
        }*/
        swal({
          text: config.repoSidebar.JAVASCRIPT_MODE,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'CANCEL',
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false
        }).then(() => {

          this.mode = "javascript"
          this.editorMode.emit(this.mode);
          this.swelldata(reponame, filename);

        })

      }
    }
    this.swelldata(reponame, filename);
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


}