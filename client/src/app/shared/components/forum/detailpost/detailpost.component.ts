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
  userId: any;

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

  postAnswer() {
// console.log("-->")
//     console.log(this.data)

//      this.forum.getPostByQuestion(this.data[0].questionTitle)
//      .subscribe(res=> {
//        this.userId = res
// this.userId[0].answers[this.userId[0].answers.length].codeSnippet = "Hey"
// /*this.userId[0].answers[this.userId[0].answers.length].answer = this.answer;
// console.log("---->")*/
//   console.log(this.userId)
//      })


     

    /* this.forum.saveAnswer(this.userId, data)
     .subscribe(res=> res.json())*/

    this.obj = {
      username: "prashant",
      answer: this.answer,
      likes: "11",
      dislikes: "2"
    }
    this.forum.saveAnswer(this.data[0].questionTitle, this.userId)
      .subscribe(res => {
          this.data = res;
        })
      }
    }
  


 
