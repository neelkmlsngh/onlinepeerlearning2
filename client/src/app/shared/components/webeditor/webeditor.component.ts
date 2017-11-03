import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AceEditorDirective } from 'ng2-ace-editor'
import { AceEditorModule } from 'ng2-ace-editor'
import * as JSZip from 'jszip'
import { ForumService } from '../../../shared/services/forum.service';
import { webEditorConfig } from '../../config/webEditor.config';

@Component({
  selector: 'app-webeditor',
  templateUrl: './webeditor.component.html',
  styleUrls: ['./webeditor.component.css']
})
export class WebeditorComponent implements OnInit {

  constructor(private snippet: ForumService) {}
  config = webEditorConfig;

  @Input() content: any;

  htmlValue: any = this.config.webEditor.HTMLTEMP;
  cssValue: any = this.config.webEditor.CSSTEMP;
  jsValue: any = "";
  code: any;
  isValid: boolean = true;
  isValid2: boolean = false;
  cssblob: any;
  htmlblob: any;
  jsblob: any;
  textcontent: any
  myUrl: any;
  data: any;
  html: any;
  css: any
  caretPos: any;
  caretText: any;
  obj: any;
  comments: any ;
  tabels: string ;
  unordered: any ;
  forms: any ;
  includeJs: any; 
  includeCss: any; 

  /*snippet for css*/
  commentsCss: any; 
  elementSelector: any; 
  classSelector: any ;
  idSelector: any ;
  mediaQueries: any; 

  ngOnInit() {
    this.onChange(this.code)

    this.snippet.getSnippet()
      .subscribe(res => {
        this.html = res.filter(ele => ele.language === 'html');
        this.css = res.filter(ele => ele.language === 'css');

      })
  }

  show(code) {
    this.htmlValue = code;
    this.cssValue = code;
  }

  base_tpl: string = this.config.webEditor.OUTPUTTEMP;    

  comment() {
    this.htmlValue += " " + this.comments;
  }

  table() {
    this.htmlValue += " " + this.tabels;
  }

  unodered() {
    this.htmlValue += " " + this.unordered;
  }
  form() {
    this.htmlValue += " " + this.forms;
  }
  includeJS() {
    this.htmlValue += " " + this.includeJs;
  }
  includeCSS() {
    this.htmlValue += " " + this.includeCss;
  }


  /*css snippet methods*/
  commentCss() {
    this.cssValue += " " + this.commentsCss;
  }

  elementsSelector() {
    this.cssValue += " " + this.elementSelector;
  }

  class() {
    this.cssValue += " " + this.classSelector;
  }

  id() {
    this.cssValue += " " + this.idSelector;
  }

  mediaQuery() {
    this.cssValue += " " + this.mediaQueries;
  }

  prepareSource() {

    let src = '';
    let css = '';
    let js = '';

    // HTML
    src = this.base_tpl.replace('</body>', this.htmlValue + '</body>');

    // CSS
    css = '<style>' + this.cssValue + '</style>';
    src = src.replace('</head>', css + '</head>');

    //Js

    src = src.replace('</script>', this.jsValue + '</script>');

    return src;
  };

  render() {
    let source = this.prepareSource();
    console.log("Source " + source)

    let iframe = document.querySelector('#output iframe')
    console.log(iframe);
    let iframe_doc = iframe['contentDocument'];

    iframe_doc.open();
    iframe_doc.write(source);
    iframe_doc.close();
  };

  onChange(code) {
    this.render();
  }

  cm_opt: any = {
    mode: 'text/html',
    gutter: true,
    lineNumbers: true,
  };

  /*download whole content in single file*/
  downloadFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.textcontent]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "project.html";
    let parent = document.getElementById('myDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download html file*/
  downloadHtmlFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.htmlValue]);
    this.htmlblob = blob;
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "index.html";
    let parent = document.getElementById('myHtmlDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download css file*/
  downloadCssFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.cssValue]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "style.css";
    this.cssblob = blob;
    let parent = document.getElementById('myCssDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download Javascript file*/
  downloadJsFile() {
    var downloadLink = document.createElement("a");

    var blob = new Blob([this.jsValue]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "script.js";
    let parent = document.getElementById('myJsDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download Zip file*/
  downloadZip() {
    var zip = new JSZip();
    zip.file("index.html", this.htmlValue);
    zip.file("style.css", this.cssValue);
    zip.file("script.js", this.jsValue);
    zip.generateAsync({ type: "blob" })
      .then(function(content) {
        var downloadLink = document.createElement("a");

        var blob = new Blob([content]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "project.zip";
        let parent = document.getElementById('myDiv');
        parent.appendChild(downloadLink);
        downloadLink.click();
        parent.removeChild(downloadLink);
        return false;
      });
  }

  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.caretPos = oField.selectionStart;
      this.obj = oField;
    }
  }

  add() {
    this.insertAtCursor(this.obj, this.caretText)
  }

  insertAtCursor(myField, myValue) {
    if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length);
    } else {
      myField.value += myValue;
    }
  }
}
