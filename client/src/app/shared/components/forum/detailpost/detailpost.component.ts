//@angular Files Imports
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
//Reactive Extensions Library
import 'rxjs/add/operator/switchMap';
//Custom Files Imports
import { ForumService } from '../../../services/forum.service';
import { forumConfig } from './../../../config/forum.config';
@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})

//forum questions details class
export class DetailpostComponent implements OnInit, AfterViewInit {

  constructor(private forum: ForumService, private router: ActivatedRoute, private route: Router) {}
  problemDescription:string;
  addSnippet:any;
  name: string;
  editor: string;
  obj: any = {};
  codeSnippet: string;
  data: any = {};
  errors: string;
  answer: string = "";
  questionTitle: string = "";
  userId: any;
  forumConfig=forumConfig;
  ngOnInit() {
    this.router.paramMap
      .switchMap((params: ParamMap) => this.forum.getPostById(this.router.snapshot.params['value']))
      .subscribe((res) => {
        this.data = res.data;
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

    var problemDescriptionConfig = {
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons: 'About'

    };
    CKEDITOR.replace('problemDescription', problemDescriptionConfig);
    CKEDITOR.instances.problemDescription.setData("");
  }
  //method to postAnswer
  postAnswer() {
    this.obj = {
      username: "prashant",
      answer:CKEDITOR.instances.addSnippet.getData(),
      likes: "11",
      dislikes: "2"
    }
    this.forum.saveAnswer(this.data[0].questionTitle, this.obj)
      .subscribe(res => {
        console.log(res);
      })
  }
}
