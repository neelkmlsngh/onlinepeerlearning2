import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../services/forum.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
  providers: [ForumService]
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

        var config = {
    extraPlugins: 'codesnippet',
    codeSnippet_theme: 'monokai_sublime',
    height: 356
  };

  CKEDITOR.replace( 'editor1', config );
  CKEDITOR.instances.editor1.setData("");

      this.date = new Date();  
      let day = this.date.getDate();    
      let month = this.date.getMonth() + 1;    
      let year = this.date.getFullYear();    
      this.date = day + '/' + month + '/' + year;
 }

 insertPost(data)
 {
   console.log(CKEDITOR.instances.editor1.getData());
   console.log(data.value);
   this.forum.save(data.value).subscribe((res)=>{
        //We get dialog result
        if (res) {
          console.log(res)
          swal({
      timer: 1000,
      title: "Posted Successfully",
      text:  "accepted",
      type:  'success',
      showConfirmButton: false,
    })
        } else {
          swal({
      timer: 1000,
      title: "Error occured",
      text:  "declined",
      type: 'error',
      showConfirmButton: false,
    })
        }
      })
 }
}

