import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../shared/services/forum.service';


@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})

export class SnippetComponent implements OnInit {

  constructor(private snippet: ForumService) { }

title: any;
language ="Select Language";
code: any;
text : any ;
editor1 : any;

  ngOnInit() {
    var config = {
     extraPlugins: 'codesnippet',
     codeSnippet_theme: 'monokai_sublime',
     height: 356
   };

   CKEDITOR.replace('editor1', config);
   CKEDITOR.instances.editor1.setData("");
   this.code = CKEDITOR.instances.editor1.getData();
   console.log(this.code)
  }

  submit() {
    console.log(CKEDITOR.instances.editor1.getData())
  	let obj = {
  		title: this.title,
  		language: this.language,
  		code: CKEDITOR.instances.editor1.getData()
  	}
  	this.snippet.addSnippet(obj)
  	.subscribe(res=>console.log(res))
  }

  
   mode(event) {

    this.language = event;
   
  }


}


