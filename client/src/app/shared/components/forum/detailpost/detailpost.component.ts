//@angular Files Imports
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
//Reactive Extensions Library
import 'rxjs/add/operator/switchMap';
//Custom Files Imports
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})
//forum questions details class
export class DetailpostComponent implements OnInit, AfterViewInit {
  constructor(private forum: ForumService, private router: ActivatedRoute, private route: Router) {}
  name: string;
  editor1: string;
  obj: any = {};
  codeSnippet: string;
  data: any = [];
  errors: string;
  answer: string = "";
  questionTitle: string = "";
  userId: any;

 
  ngOnInit() {
    this.router.paramMap
      .switchMap((params: ParamMap) => this.forum.getPostByQuestion(this.router.snapshot.params['value']))
      .subscribe((res) => {
        this.data = res;
      })
    error => {
      this.errors = error;
    };
  }
   ngAfterViewInit(){
     var config = {
      extraPlugins: 'codesnippet',
      codeSnippet_theme: 'monokai_sublime',
      height: 356,
      removeButtons: 'About',

    };
    CKEDITOR.replace('editor1', config);
    CKEDITOR.instances.editor1.setData("");
   }
  postAnswer() {
    this.obj = {
      username: "prashant",
      answer: CKEDITOR.instances.editor1.getData(),
      likes: "11",
      dislikes: "2"
    }
    // debugger
    this.forum.saveAnswer(this.data[0].questionTitle, this.obj)
      .subscribe(res => {
        console.log(res);
      })
  }
}
