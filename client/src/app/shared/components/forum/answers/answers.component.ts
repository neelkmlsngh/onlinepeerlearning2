import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  constructor(private forum: ForumService, private router: ActivatedRoute, private route: Router) { }
   data: any = [];
   errors: any;

  ngOnInit() {

  	 this.router.paramMap
      .switchMap((params: ParamMap) => this.forum.getPostByQuestion(this.router.snapshot.params['value']))
      .subscribe((res) => {
        this.data = res;
        console.log(this.data);
      })
    error => {
      this.errors = error;
    };
  }

}
