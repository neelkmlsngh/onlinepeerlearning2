import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit,AfterViewInit {
  

 constructor(private forum:ForumService) { }
    p: number[] = [];
 data:any=[];

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

