import {  OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { config } from './../../config/config';


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

  constructor(private editorService: EditorService, private gitService: GitService) {}


  ngAfterViewInit() {
    this.notebook = window['RunKit'].createNotebook({
      element: document.getElementById("my-element"),
      source: this.content
    })
  }

/*  changeContent(){
    this.content="Content changed";
    this.notebook.setSource(this.content);
  }
 */
 
  //method to get github repositories
  ngOnInit() {
    
    // this.lang = "javascript";
    
  }

}