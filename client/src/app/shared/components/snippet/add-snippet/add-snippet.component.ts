import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../../../../shared/services/snippet.service';
import * as CKEditorModule from 'ng2-ckeditor';
import { config } from '../../../config/config';

@Component({
  selector: 'app-add-snippet',
  templateUrl: './add-snippet.component.html',
  styleUrls: ['./add-snippet.component.css']
})

export class AddSnippetComponent implements OnInit {

  constructor(private snippet: SnippetService) {}
  languag: any='javascript';
  title: any;
  language: any;
  code: any;
  text: any;
  editor1: any;
  languages: any = [];
  con = config; // config
  ngOnInit() {
    this.languages = config.language;

  }

  // method to add code to snippet
  submit() {
    this.code = this.editor1;

    let obj = {
      title: this.title,
      language: this.languag,
      code: this.code
    }

    this.snippet.addSnippet(obj)
      .subscribe(res => console.log(res))
  }

  // method to set the prefered language
  mode(event) {
    this.languag = event.target.value;
  }


}