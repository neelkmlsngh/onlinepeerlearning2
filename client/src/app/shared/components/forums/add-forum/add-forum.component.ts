import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';
import swal from 'sweetalert2';
// import * as CKEDITOR from 'cke'
import { CKEditorModule } from 'ng2-ckeditor';

import { forumConfig } from './../../../config/forum.config';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css'],
   providers: [ForumService]
})
export class AddForumComponent implements OnInit, AfterViewInit {

forumConfig=forumConfig;
    ckeditorContent:any;
    date:any;
    userName:any;
    questionTitle:string;
    problemDescription:string;
    tags:string;
    dateCurr:any;
    currentUser:any;
    codeSnippet:string;
    obj:any={};
    addSnippet:any;
    items:any=[];
    data : any;

  constructor(private forum: ForumService) {
    
  }

  ngOnInit() {
   this.currentUser= JSON.parse(localStorage.getItem('currentUser'));
   this.userName=this.currentUser.userName;
   console.log(this.userName);

    this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    this.date = day + '/' + month + '/' + year;
  }

  //method to call problemDescriptionConfigEditor
  ngAfterViewInit() {
    var configuration = {
      extraPlugins: 'codesnippet',
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons:forumConfig.NEWPOST.CKEDITOR.REMOVED_BUTTONS,
      removePlugins:forumConfig.NEWPOST.CKEDITOR.REMOVED_PLUGINS,
    };
    CKEDITOR.replace('addSnippet', configuration);
    CKEDITOR.instances.addSnippet.setData("");

    var problemDescriptionConfig = {
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons: 'About'

    };
    CKEDITOR.replace('problemDescription', problemDescriptionConfig);
    CKEDITOR.instances.problemDescription.setData("");
  }
  //method to add post on forum
  insertPost() {
    console.log("prashnt");
    // let user = JSON.parse(localStorage.getItem('currentUser'));
    // let userName=user.userName
    this.obj = {
      questionTitle: this.questionTitle,
      codeSnippet: CKEDITOR.instances.addSnippet.getData(),
      problemDescription: CKEDITOR.instances.problemDescription.getData(),
      tags: this.items,
      date: this.date,
      userName:this.userName,

    }

    console.log(this.obj);

    this.forum.savePost(this.obj).subscribe((res) => {
     console.log(res);
      if (res) {
          // this.data = res;
          swal({ //alert message for success
          timer: 2200,
          title: "Posted Successfully",
          text: "",
          type: 'success',
          showConfirmButton: false,
        })
      } else {
        swal({ //alert message for error
          timer: 2200,
          title: "Error occured",
          text: "",
          type: 'error',
          showConfirmButton: false,
        })
      }
    })
  }

}