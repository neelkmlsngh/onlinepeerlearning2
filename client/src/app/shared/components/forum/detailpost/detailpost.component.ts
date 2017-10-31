import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})

export class DetailpostComponent implements OnInit {

  constructor(private forum: ForumService, private router: ActivatedRoute, private route: Router) {}
  name: string;
  obj:any = {};
  codeSnippet: string;
  data: any = [];
  errors: string;
  answer:string="";
  questionTitle:string="";
  ngOnInit() {

    this.router.paramMap
      .switchMap((params: ParamMap) => this.forum.getPostByQuestion(this.router.snapshot.params['value']))
      .subscribe((res) => {
        this.data = res;
        console.log(this.data[0].questionTitle);
      })
    error => {
      this.errors = error;
    };
  }

  postAnswer(data) {
    console.log(data.value);
    this.obj = {
      username: "prashant",
      answer: this.answer,
      likes: "11",
      dislikes: "2"
    }
    this.forum.saveAnswer(this.data[0].questionTitle, this.obj)
      .subscribe(res => {
          this.data = res;
        })
      }
    }


 
