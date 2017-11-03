import { Component, OnInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
import { ForumService } from '../../../services/forum.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor(private forum: ForumService, private router: ActivatedRoute, private route: Router) { }
   data: any = [];
   question:string;
   errors: any;
  //method to post answer
  ngOnInit() {
  	 this.router.paramMap
      .switchMap((params: ParamMap) => this.forum.getPostByQuestion(this.router.snapshot.params['value']))
      .subscribe((res) => {
        this.question=res[0].questionTitle;
        this.data = res[0].answers;
      })
    error => {
      this.errors = error;
    };
  }

}
