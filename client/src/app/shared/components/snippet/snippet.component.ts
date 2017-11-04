import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../../../shared/services/snippet.service';


@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})

export class SnippetComponent implements OnInit {

  constructor(private snippet: SnippetService) { }

    title: any;
    language ="Select Language";
    code: any;
    text : any ;
    editor1 : any;

  ngOnInit() {
    //config for ckeditor
    var config = {
     extraPlugins: 'codesnippet',
     codeSnippet_theme: 'monokai_sublime',
     height: 356
   };
    
    // input text area for code snippet of ck editor
   CKEDITOR.replace('editor1', config);
   CKEDITOR.instances.editor1.setData("");
   this.code = CKEDITOR.instances.editor1.getData();
   console.log(this.code)
  }

   // method to add code to snippet
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

   // method to set the prefered language
   mode(event) {
    this.language = event;
  }


}


