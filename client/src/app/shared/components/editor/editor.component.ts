import { Component, EventEmitter, Output, ViewChild ,  OnInit,Input } from '@angular/core'
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

  @Input() content :any;
  cont: any = this.content;
  notebook:any;

  constructor(private editorService: EditorService, private gitService: GitService) {}

ngOnChanges(){
  if(this.notebook==undefined) {
this.notebook = window['RunKit'].createNotebook({
      element: document.getElementById("my-element"),
      source: this.content
    })
}
    this.notebook.setSource(this.content)
}
 
  //method to get github repositories
  ngOnInit() {
    
    // this.lang = "javascript";
    
  }


  mode() {
    // this.lang = language;
  }


}