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
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})

//forum questions details class
export class DetailpostComponent implements OnInit, AfterViewInit {

  constructor(private forum: ForumService, private router: ActivatedRoute, private route: Router) {

  }

  name: string;
  editor: string;
  obj: any = {};
  codeSnippet: string;
  data: any = {};
  solutions: any = [];
  errors: string;
  answer: string = "";
  questionTitle: string = "";
  userId: any;
  date:any;
  forumConfig=forumConfig;
  ngOnInit() {
       this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    this.date = day + '/' + month + '/' + year;

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
    var config = {
      extraPlugins: 'codesnippet',
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons: 'About',

    };
    CKEDITOR.replace('editor', config);
    CKEDITOR.instances.editor.setData("");
  }

  editorChange(){
    $('.codesnippet pre').height('150px');
  }
  //method to postAnswer
  postAnswer() {
    this.obj = {
      username: "prashant",
      answer: CKEDITOR.instances.editor.getData(),
      likes: "11",
      dislikes: "2",
      date: this.date
    }
    this.forum.saveAnswer(this.data._id, this.obj)
      .subscribe(res => {
        console.log(res);
      })
  }
}
