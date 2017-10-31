import { Component, EventEmitter, Output, ViewChild, OnInit, Input } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { config } from './../../config/config';
import { AceEditorModule } from 'ng2-ace-editor';

import { EditorService } from '../../services/editor.service';
import { GitService } from '../../services/git.service'
import { CoderunnerService } from '../../services/coderunner.service'

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

  jsValue: any = "";
  data: any;
  codeoutput: any;
  dataObj: any = "";

  constructor(private coderunner: CoderunnerService) {}

  ngOnInit() {}

  /*execute the code and return output*/
  executecode() {
    this.coderunner.executecode(this.jsValue)
      .subscribe(data => {
        this.codeoutput = data
        this.dataObj = this.codeoutput._body
      })
  }


  /*download Javascript file*/
  downloadJsFile() {
    let downloadLink = document.createElement("a");

    let blob = new Blob([this.jsValue]);
    let url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "script.js";
    let parent = document.getElementById('myJsDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }
}
