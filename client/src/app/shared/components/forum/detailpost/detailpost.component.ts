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

  constructor(private forum:ForumService, private router: ActivatedRoute, private route: Router) { }
  name:string;
  codeSnippet:string;
	data:any=[];
	errors:string;

  ngOnInit() {
    var config = {
    extraPlugins: 'codesnippet',
    codeSnippet_theme: 'monokai_sublime',
    height: 356
  };

  CKEDITOR.replace( 'editor1', config );

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
