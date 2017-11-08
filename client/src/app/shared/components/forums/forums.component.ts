import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router'
import { MatIconRegistry } from '@angular/material';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import 'rxjs/Rx';

import { ForumService } from '../../services/forum.service';
import { forumConfig } from './../../config/forum.config';


@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {

  likes = 0;
  likeflag = false;
  dislikeflag = false;
  dislikes = 0;
  data: any = {};
  answer: any = {};
  noofanswer: number = 0;
  answerlength: any = [];
  p: number[] = [];
  forumConfig=forumConfig;

  constructor(private forum: ForumService, private router: Router) { }

 // method to show posts on forum
  ngOnInit() {
    this.viewPost();
  }



  //method call posts from service
  viewPost() {
    this.forum.getPost().subscribe((data1) => {
      this.data = data1;
      console.log(this.data);
    })
  }

  //method for search 
  getDetails(searchTerm: any) {
    this.forum.searchEntries(searchTerm.value)
      .subscribe(res => {
        this.data = res;
      });
  }

  //method to navigate to questions detail
  getPostDetail(value): any {
    this.router.navigate(['forums','view' ,value])
  }

  //method for likes
  like(value):any {
    if (this.likeflag == false) {
      if (this.dislikeflag == true) {
        this.likes++;
        this.likeflag = true;
        this.dislikes--;
        this.dislikeflag = false;
      } else {
        this.likes++;
        this.likeflag = true;
      }
    } else {
      this.likes--;
      this.likeflag = false;
    }
    this.forum.updateLike(value,this.likes)
     .subscribe(res => {
       console.log(res);
      })
  }

  //method for dislikes
  dislike(value):any {
    if (this.dislikeflag == false) {
      if (this.likeflag == true) {
        this.dislikes++;
        this.dislikeflag = true;
        this.likes--;
        this.likeflag = false;
      } else {
        this.dislikes++;
        this.dislikeflag = true;
      }
    } else {
      this.dislikes--;
      this.dislikeflag = false;
    }
    this.forum.updateLike(value,this.dislikes)
     .subscribe(res => {
       console.log(res);
      })
  }
  
  //method to navigate to answers
  showAnswers(value) {
    this.router.navigate(['/answers', value])

  }

}
