
import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  ckeditorContent:any;
    date:any;
    questionTitle:string;
    problemDescription:string;
    tags:string;
    dateCurr:any;
    codeSnippet:string;



 constructor(private forum:ForumService) { }

 
 ngOnInit() {
      this.date = new Date();  
      let day = this.date.getDate();    
      let month = this.date.getMonth() + 1;    
      let year = this.date.getFullYear();    
      this.date = day + '/' + month + '/' + year;
 }

 insertPost(data)
 {
   
   console.log(data.value);
   this.forum.save(data.value).subscribe((data1)=>{
     console.log(data1);
     alert("your post have been inserted");
      location.reload();
   })
 }
}

