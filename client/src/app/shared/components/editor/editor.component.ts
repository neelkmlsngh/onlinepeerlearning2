import {  OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { config } from './../../config/config';

/*import 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/html';
import 'ace-builds/src-min-noconflict/snippets/html';*/


import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service'


@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  notebook:any;
  content:any="Please enter your code here";
  languages:any=[];

  constructor(private editorService: EditorService, private gitService: GitService) {}


  ngAfterViewInit() {
    this.notebook = window['RunKit'].createNotebook({
      element: document.getElementById("my-element"),
      source: this.content
    })
  }

  changeContent(){
    this.content="Content changed";
    this.notebook.setSource(this.content);
  }
  
  //declaring variables

 //  enter:string;
 //  lang: any;
 //  url: any = "";

 //  text: string ="enter code here";
  

 //  output:any;
 //  value:{};
 //    windowRef:any;
  // screenSharingLink:any;

 //  options: any = {
 //    maxLines: 1000, 
 //    printMargin: false,
 //  };
  
 //  val:any


  //creating the instances of services



  //method to execute the code 
  // run(text) {
  //   this.enter = "output"
  //   this.value = {
  //     run: text

  //   }
  //   this.editorService.runCode(this.value).subscribe(data => {
  //     this.output = data.result;
  //     console.log(this.output)
  //   }, err => this.output = err)
  // }

  //method to clear the terminal
  clear() {
  //   console.log(this.text)
  //   this.text = null;
  //   console.log(this.text)
  }

  //method to get github repositories
  ngOnInit() {
    this.languages=config.language;
    // this.lang = "javascript";
    
  }


  mode() {
    // this.lang = language;
  }




}