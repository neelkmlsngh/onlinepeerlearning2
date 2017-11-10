//@angular Files Imports
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
//Reactive Extensions Library
import 'rxjs/add/operator/switchMap';
//Custom Files Imports
import { ForumService } from '../../../services/forum.service';
import { forumConfig } from './../../../config/forum.config';
import * as $ from 'jquery'

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit {
  constructor(private forum: ForumService, private router: ActivatedRoute, private route: Router) {}
  answerText:string;
  addSnippet:any;
  name: string;
  editor: string;
  obj: any = {};
  codeSnippet: string;
  data: any = {};
  solutions: any = [];
  currentUser: any;
  errors: string;
  answer: string = "";
  questionTitle: string = "";
  userId: any;
  userName:any;
  date:any;
  forumConfig=forumConfig;

  ngOnInit() {
   //    this.currentUser= JSON.parse(localStorage.getItem('currentUser'));
   // this.userName=this.currentUser.userName;
   // console.log(this.userName);

       this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    this.date = day + '/' + month + '/' + year;

// getPostById method get the post by searching its id
    this.router.paramMap
      .switchMap((params: ParamMap) => this.forum.getPostById(this.router.snapshot.params['value']))
      .subscribe((res) => {
        this.data = res.data;
        this.solutions = this.data.answers;
        console.log(this.data);
      })
    error => {
      this.errors = error;
    };
  }
  //method to load editor to postAnswer
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

    var answerTextConfig = {
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons: 'About'
    };
    
    CKEDITOR.replace('answerText', answerTextConfig);
    CKEDITOR.instances.answerText.setData("");
  }

  //method to postAnswer
  postAnswer() {
    this.obj = {
      username: "prashant",
      answer:CKEDITOR.instances.answerText.getData(),
      codeSnippet: CKEDITOR.instances.addSnippet.getData(),
      date: this.date
    }
    this.forum.saveAnswer(this.data._id, this.obj)
      .subscribe(res => {
        console.log(res);
      })
  }

}
