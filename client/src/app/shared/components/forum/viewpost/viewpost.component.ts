import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router} from '@angular/router'
import {MatIconRegistry} from '@angular/material';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx';

import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css'],
  providers: [ForumService]
})
export class ViewpostComponent implements OnInit,AfterViewInit {

data:any=[];

answer:any={};
noofanswer:number=0;
answerlength: any = [];
p: number[]=[];

 constructor(private forum:ForumService,private router: Router) { 

 }

 ngOnInit() {
  this.viewPost();
 }

 ngAfterViewInit() {
    const searchTerm:any = document.getElementById('search');
     const search$= Observable.fromEvent(searchTerm, 'keyup')
       //.do(()=> console.log(searchTerm.value))
      
       .switchMap(()=>this.forum.searchEntries(searchTerm.value));

       search$.subscribe(
         data=>this.data=data
       ); 
  }

 viewPost()
 {
   //console.log(data.value);
   this.forum.getPost().subscribe((data1)=>{
   
     this.data=data1;

   })
 }

   getQuestionDetail(value):any { 
      this.router.navigate(['/questiondetail',value])   
    }

    showAnswers(value):any{
      // this.forum.getPostByQuestion(value).subscribe((data)=>{
      //   console.log("answers................",data[0].answers);
      // })
     this.router.navigate(['/answers',value])  

    }

}