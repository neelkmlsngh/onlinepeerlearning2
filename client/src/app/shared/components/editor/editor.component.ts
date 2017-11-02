import { Component, EventEmitter, Output, ViewChild, OnInit, Input } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { config } from './../../config/config';
import { AceEditorModule } from 'ng2-ace-editor';

import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service'
import { CoderunnerService } from '../../services/coderunner.service'



import 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/html';
import 'ace-builds/src-min-noconflict/snippets/html';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {



  @Input() content: any;

  @Input() reponame: any;

  @Input() filenamed: any;

  jsValue: any = "hii everyone";
  data: any;
  codeoutput: any;
  dataObj: any = "";
  latestcommit: any;
  treecommit: any;
  newtree: any;
  newcommit: any;
  filename: any;
  filesha: any;

  basetree: any = {};
  newcommitobj: any = {};
  lastcommit: any = {};
  updatefileobj: any = {};
  deletefileobj: any = {};

  constructor(private coderunner: CoderunnerService, private gitService: GitService) {}

  ngOnInit() {}

  /*execute the code and return output*/
  executecode() {
    this.coderunner.executecode(this.jsValue)
      .subscribe(data => {
        this.codeoutput = data
        this.dataObj = this.codeoutput._body
      })
  }


  /*download Javascript file*/
  downloadJsFile() {
    let downloadLink = document.createElement("a");

    let blob = new Blob([this.jsValue]);
    let url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "script.js";
    let parent = document.getElementById('myJsDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /**
   * method to create a file on git
   */
  save() {

    console.log(this.content);
    console.log(this.reponame);
    console.log(this.filenamed);
    /*console.log(this.content);
    console.log("repository name is " + this.reponame);
    console.log("file name is " + this.filenamed);*/

    this.gitService.createFile(this.reponame)
      .subscribe(repos => {
        console.log(this.reponame);
        this.latestcommit = repos.object.sha;
        // console.log(repos)
        this.gitService.commitfile(this.reponame, this.latestcommit)
          .subscribe(repos => {
            this.treecommit = repos.sha;
            this.basetree = {
              "base_tree": this.treecommit,
              "tree": [{
                "path": "helloMoto.html",
                "mode": "100644",
                "type": "blob",
                "content": this.content
              }]
            }

            this.gitService.treecommit(this.reponame, this.basetree)
              .subscribe(repos => {
                this.newtree = repos.sha;
                this.newcommitobj = {
                  "parents": [this.latestcommit],
                  "tree": this.newtree,
                  "message": "new file created"
                }

                this.gitService.newcommit(this.reponame, this.newcommitobj)
                  .subscribe(repos => {
                    this.newcommit = repos.sha;
                    this.lastcommit = {
                      "sha": this.newcommit
                    }

                    this.gitService.lastcommit(this.reponame, this.lastcommit)
                      .subscribe(repos => {})
                  })
              })
          })
      })
  }

  /**
   *method to get the file and update the content on git
   */
  update() {
    console.log("INDIDE UPDATE " + this.content);
    //getting the file sha
    this.gitService.getsha(this.reponame, this.filenamed)
      .subscribe(repos => {
        this.filesha = repos.sha;
        this.updatefileobj = {
          "message": "file content updated",
          "path": this.filenamed,
          "content": btoa(this.content),
          "sha": this.filesha
        }
        this.gitService.updateFile(this.reponame, this.filenamed, this.updatefileobj)
          .subscribe(repos => {
            // console.log(repos)

            if (repos) {
              swal({
                timer: 2200,
                title: "file updated successfully!",
                text: "",
                type: 'success',
                showConfirmButton: false,
              })
            } else {
              swal({
                timer: 2200,
                title: "Error occured",
                text: "",
                type: 'error',
                showConfirmButton: false,
              })
            }


          })

      })
  }


  /**
   *method to get the file and delete the content on git
   */
  delete() {
    console.log("INSIDE DELETE " + this.content);
    //getting the file sha
    this.gitService.getsha(this.reponame, this.filenamed)
      .subscribe(repos => {
        this.filesha = repos.sha;
        this.deletefileobj = {
          "message": "file deleted",
          "path": this.filenamed,
          "sha": this.filesha
        }
        this.gitService.deleteFile(this.reponame, this.filenamed, this.deletefileobj)
          .subscribe(repos => {
            // console.log(repos)
            if (repos) {
              swal({
                timer: 2200,
                title: "file deleted successfully!",
                text: "",
                type: 'success',
                showConfirmButton: false,
              })
            } else {

              swal({
                timer: 2200,
                title: "Error occured",
                text: "",
                type: 'error',
                showConfirmButton: false,
              })

            }

          })
      })
  }
}
