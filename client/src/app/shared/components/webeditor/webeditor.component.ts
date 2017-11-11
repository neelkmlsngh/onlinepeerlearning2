import { Component, OnInit, ViewChild, ElementRef, Input, NgZone, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormsModule } from '@angular/forms'
import { AceEditorDirective } from 'ng2-ace-editor'
import { AceEditorModule } from 'ng2-ace-editor'
import * as JSZip from 'jszip'
import swal from 'sweetalert2';
import { SnippetService } from '../../../shared/services/snippet.service';
import { AuthenticationService } from '../../services/authentication.service';
import { GitService } from '../../services/git.service';
import { webEditorConfig } from '../../config/webEditor.config';
import { config } from './../../config/editor.config';

@Component({
  selector: 'app-webeditor',
  templateUrl: './webeditor.component.html',
  styleUrls: ['./webeditor.component.css']
})
export class WebeditorComponent implements OnInit {

  constructor(private snippet: SnippetService,private authenticationService: AuthenticationService,private gitService: GitService, private zone: NgZone, private modalService: BsModalService) {
    this.methodToExport = this.calledFromOutside;
    window['angularComponentRef'] = { component: this, zone: zone };
  }

  config = webEditorConfig;
  editorConfig=config;

  @Input() content: any
  @Input() reponame: any;
  @Input() filenamed: any;
  @ViewChild('createClose') createClose: ElementRef;
  @ViewChild('updateClose') updateClose: ElementRef;
  @ViewChild('deleteClose') deleteClose: ElementRef;

  latestcommit: any;
  treecommit: any;
   filesha: any;
  newtree: any;
  newcommit: any;
  basetree: any = {};
  newcommitobj: any = {};
  lastcommit: any = {};
  updateMessage: string;
  updateMsg: string;
  deleteCommit: string;
  deleteMsg: string;
  fileName: string
  updatefileobj: any = {};
  deletefileobj: any = {};


  htmlValue: any  = this.config.webEditor.HTMLTEMP;
  cssValue: any = this.config.webEditor.CSSTEMP;
  jsValue: any = this.config.webEditor.JSSTEMP;
  code: any;
  cssblob: any;
  htmlblob: any;
  jsblob: any;
  textcontent: any;
  html: any;
  css: any;
  caretPos: any;
  caretText: any;
  obj: any;
  windowRef: any;
  methodToExport: any;
  link: string = '';
  showModalBox:boolean = false;
  public modalRef: BsModalRef;

  /*variable for snippet used in css*/
  comments: any;
  tabels: string;
  unordered: any;
  forms: any;
  includeJs: any;
  includeCss: any;

  /*variable for snippet used in css*/
  commentsCss: any;
  elementSelector: any;
  classSelector: any;
  idSelector: any;
  mediaQueries: any;

  public openModal(template: TemplateRef < any > ) {
    if(this.showModalBox==false){
    this.modalRef = this.modalService.show(template);
  }
    this.showModal();
  }

  showModal() {
   this.showModalBox = !this.showModalBox;
 }
  calledFromOutside(url: string) {
    this.zone.run(() => {
      this.link = url;
    });
  }

  ngOnInit() {
    this.content=this.htmlValue;
    this.onChange(this.code)

    this.snippet.getSnippet()
      .subscribe(res => {

        this.html = res.filter(ele => ele.language === 'Html');
        this.css = res.filter(ele => ele.language === 'CSS');

      })
  }

    //method to create a file on git
  createFile(fileName, createCommitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 2200,
        title: "You have not generated your token",
        text: "",
        type: 'success',
        showConfirmButton: false,
      })
    } else {
      this.fileName = fileName.value['fileName'];
      this.updateMessage = createCommitMessage.value['createMsg'];
      this.reponame = this.reponame;
      //hitting the create file api to get sha of the latest commit
      this.gitService.createFile(this.reponame)
        .subscribe(repos => {
          this.latestcommit = repos.object.sha;
          //hitting the commit file api to get sha of the tree commit
          this.gitService.commitfile(this.reponame, this.latestcommit)
            .subscribe(repos => {
              this.treecommit = repos.sha;
              this.basetree = {
                "base_tree": this.treecommit,
                "tree": [{
                  "path": this.fileName,
                  "mode": "100644",
                  "type": "blob",
                  "content": this.content
                }]
              }
              //hitting the create file api to get sha of the new tree commit
              this.gitService.treecommit(this.reponame, this.basetree)
                .subscribe(repos => {
                  this.newtree = repos.sha;
                  this.newcommitobj = {
                    "parents": [this.latestcommit],
                    "tree": this.newtree,
                    "message": this.updateMessage
                  }
                  //hitting the create file api to get sha of the new commit
                  this.gitService.newcommit(this.reponame, this.newcommitobj)
                    .subscribe(repos => {
                      this.newcommit = repos.sha;
                      this.lastcommit = {
                        "sha": this.newcommit
                      }
                      //hitting final api to create the file
                      this.gitService.lastcommit(this.reponame, this.lastcommit)
                        .subscribe(repos => {})
                      //sweet alert on getting response
                      if (repos) {
                        swal({
                          timer: 2200,
                          title: "file " + this.fileName + " created successfully!",
                          text: "",
                          type: 'success',
                          showConfirmButton: false,
                        })
                      }
                      //sweet alert on getting error
                      else {
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
            })
        })
      this.createClose.nativeElement.click();  
      fileName.reset();
      createCommitMessage.reset();
    }
  }

  //method to get the file and update the content on git
  updateFile(commitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 2200,
        title: "You have not generated your token",
        text: "",
        type: 'success',
        showConfirmButton: false,
      })
    } else {
      this.updateMsg = commitMessage.value['updateMsg'];
      //getting the file sha
      this.gitService.getsha(this.reponame, this.filenamed)
        .subscribe(repos => {
          this.filesha = repos.sha;
          this.updatefileobj = {
            "message": this.updateMsg,
            "path": this.filenamed,
            "content": btoa(this.content),
            "sha": this.filesha
          }
          //hitting the update file api to update the file contents
          this.gitService.updateFile(this.reponame, this.filenamed, this.updatefileobj)
            .subscribe(repos => {
              //sweet alert on getting response
              if (repos) {
                swal({
                  timer: 2200,
                  title: "file " + this.filenamed + " updated successfully!",
                  text: "",
                  type: 'success',
                  showConfirmButton: false,
                })
              }
              //sweet alert on getting error
              else {
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
      this.updateClose.nativeElement.click();   
      commitMessage.reset();
    }
  }


  //method to get the file and delete the content on git
  deleteFile(commitMessage) {
    if (this.authenticationService.pacToken == null) {
      swal({
        timer: 2200,
        title: "You have not generated your token",
        text: "",
        type: 'success',
        showConfirmButton: false,
      })
    } else {
      this.deleteMsg = commitMessage.value['deleteMsg'];
      //getting the file sha
      this.gitService.getsha(this.reponame, this.filenamed)
        .subscribe(repos => {
          this.filesha = repos.sha;
          this.deletefileobj = {
            "message": this.deleteMsg,
            "path": this.filenamed,
            "sha": this.filesha
          }
          //hitting the delete file api to delete the file
          this.gitService.deleteFile(this.reponame, this.filenamed, this.deletefileobj)
            .subscribe(repos => {
              //sweet alert on getting response
              if (repos) {
                swal({
                  timer: 2200,
                  title: "file " + this.filenamed + " deleted successfully!",
                  text: "",
                  type: 'success',
                  showConfirmButton: false,
                })
              } else {
                //sweet alert on getting error
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
      this.deleteClose.nativeElement.click();
      commitMessage.reset();
    }
  }
  

/*snippet show in html editor*/
  showHtml(code) {
    this.content += " " + code;
  }

/*snippet show in css editor*/
 showCss(code) {
     this.cssValue+= " " + code;
  }

  /*Giving the basic syntax of an HTMl page on Iframe*/
  base_tpl: string = this.config.webEditor.OUTPUTTEMP;
  
  prepareSource() {
    let src = '';
    let css = '';
    let js = '';
    // HTML
    src = this.base_tpl.replace('</body>', this.content + '</body>');
    // CSS
    css = '<style>' + this.cssValue + '</style>';
    src = src.replace('</head>', css + '</head>');
    //Js
    src = src.replace('</script>', this.jsValue + '</script>');
    return src;
  };

  /*To return value in iframe*/
  render() {
    let source = this.prepareSource();
    let iframe = document.querySelector('#output iframe')
    
    let iframe_doc = iframe['contentDocument'];

    iframe_doc.open();
    iframe_doc.write(source);
    iframe_doc.close();
  };

  /*Method to pass the value directly into iframe*/
  onChange(code) {
    this.render();
  }

  cm_opt: any = {
    mode: 'text/html',
    gutter: true,
    lineNumbers: true,
  };
  /*HTML snippet methods start*/
  comment() {
    this.content += " " + this.comments;
  }

  table() {
    this.content += " " + this.tabels;
  }

  unodered() {
    this.content += " " + this.unordered;
  }
  form() {
    this.content += " " + this.forms;
  }
  includeJS() {
    this.content += " " + this.includeJs;
  }
  includeCSS() {
    this.content += " " + this.includeCss;
  }
  /*HTML snippet methods ends*/

  /*css snippet methods start*/
  commentCss() {
    this.cssValue += " " + this.commentsCss;
  }

  elementsSelector() {
    this.cssValue += " " + this.elementSelector;
  }

  class() {
    this.cssValue += " " + this.classSelector;
  }

  id() {
    this.cssValue += " " + this.idSelector;
  }

  mediaQuery() {
    this.cssValue += " " + this.mediaQueries;
  }
  /*css snippet methods ends*/

  /*download whole content in single file*/
  downloadFile() {

    console.log(this.content + this.reponame + this.filenamed );
    var downloadLink = document.createElement("a");
    var blob = new Blob([this.textcontent]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "project.html";
    let parent = document.getElementById('myDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download html file*/
  downloadHtmlFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.content]);
    this.htmlblob = blob;
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "index.html";
    let parent = document.getElementById('myHtmlDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download css file*/
  downloadCssFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.cssValue]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "style.css";
    this.cssblob = blob;
    let parent = document.getElementById('myCssDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download Javascript file*/
  downloadJsFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.jsValue]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "script.js";
    let parent = document.getElementById('myJsDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download Zip file*/
  downloadZip() {
    var zip = new JSZip();
    zip.file("index.html", this.content);
    zip.file("style.css", this.cssValue);
    zip.file("script.js", this.jsValue);
    zip.generateAsync({ type: "blob" })
      .then(function(content) {
        var downloadLink = document.createElement("a");

        var blob = new Blob([content]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "project.zip";
        let parent = document.getElementById('myDiv');
        parent.appendChild(downloadLink);
        downloadLink.click();
        parent.removeChild(downloadLink);
        return false;
      });
  }

  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.caretPos = oField.selectionStart;
      this.obj = oField;
    }
  }

  add() {
    this.insertAtCursor(this.obj, this.caretText)
  }

  insertAtCursor(myField, myValue) {
    if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length);
    } else {
      myField.value += myValue;
    }
  }
}
