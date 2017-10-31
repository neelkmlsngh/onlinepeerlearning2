import { Component, EventEmitter, Output, ViewChild, OnInit, Input } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { config } from './../../config/config';
import { AceEditorModule } from 'ng2-ace-editor';

import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service'

import 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/html';
import 'ace-builds/src-min-noconflict/snippets/html';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {

  @Input() content: any;
  cont: any = this.content;
  notebook: any;

  constructor(private editorService: EditorService, private gitService: GitService) {}

  text: string = "//Enter your code here";
  options: any = { maxLines: 1000, printMargin: false };

//get code from ace ecitor to runkit
  onChange(code) {
    if (this.notebook != undefined) {
      this.notebook.setSource(code)
      console.log("new code", code);
    }
  }

  ngOnChanges() {
    if (this.notebook == undefined) {
      this.notebook = window['RunKit'].createNotebook({
        element: document.getElementById("editor"),
        source: this.content
      })
    }
    this.notebook.setSource(this.content)
  }

  //method to get github repositories
  ngOnInit() {

    // this.lang = "javascript";

  }

 

}
