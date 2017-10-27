import { Component, OnInit } from '@angular/core';

import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {

data:any=[];
 constructor(private forum:ForumService) { }

 ngOnInit() {
  this.viewPost();
 }

 viewPost()
 {
   //console.log(data.value);
   this.forum.getPost().subscribe((data1)=>{
     this.data=data1;
     console.log(this.data);
   })
 }

 getDetails(searchTerm:any){
  //alert(searchTerm.value
console.log(searchTerm)
  this.forum.searchEntries(searchTerm.value)
    .subscribe(res => {
      this.data =res;
      console.log(this.data)
     
    });
}

}

