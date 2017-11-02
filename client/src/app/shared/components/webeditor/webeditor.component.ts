import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AceEditorDirective } from 'ng2-ace-editor'
import { AceEditorModule } from 'ng2-ace-editor'
import * as JSZip from 'jszip'


@Component({
  selector: 'app-webeditor',
  templateUrl: './webeditor.component.html',
  styleUrls: ['./webeditor.component.css']
})
export class WebeditorComponent implements OnInit {
  htmlValue: any = "<h1>Hello World</h1>";
  cssValue: any = "body{color:red}";
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
  caretPos: any;
  caretText: any;
  obj: any;
  comments: any = "\n<!-- Enter Your Comment -->";
  tabels: string = "\n<table>\n" +
    "<tr>\n\t" +
    "<th>Heading</th>\n\t" +
    "<th>Heading</th>\n" +
    "</tr>\n" +
    "<tr>\n\t" +
    "<td>Value</td>\n\t" +
    "<td>Value</td>\n" +
    "</tr>\n" +
    "</table>";

  unordered: any = '\n<ul>\n\t' +
    '<li>Item 1</li>\n\t' +
    '<li>Item 2</li>\n\t' +
    '<li>Item 3</li>\n' +
    '</ul>';


  forms: any = '\n<form action="" method="get">\n\t' +
    '<label for="first-name">First name :</label>\n\t' +
    '<input id="first-name" type="text" name="firstname"><br><br>\n\t' +
    '<label for="last-name">Last name :</label>\n\t' +
    '<input id="last-name" type="text" name="lastname"><br>\n\t' +
    '<input type="submit" value="Submit">\n' +
    '</form>';


  includeJs: any = '\n<script src="script.js"></script>';
  includeCss: any = '\n<link href="style.css" rel="stylesheet">';

/*snippet for css*/
  commentsCss:any ="\n/* Add your comment here */";
  elementSelector:any ="\np {"+
     "\nfont-size: 20px;"+
      "\n}";
  classSelector:any= "\n.className {"+
    "\nbackground-color: green;"+
    "\n}";
  idSelector:any= "\n#idName {"+
    "\nbackground-color: green;"+
    "\n}";
  mediaQueries:any ="\n@media screen and (max-width: 320px) {"+
  "\n/* Rules when screen is up to 320px wide */"+
    "\n}"+

    "\n@media screen and (min-width: 321px) and (max-width: 768px) {"+
      "\n/* Rules when screen is between 321px and 768px wide */"+
    "\n}"+

    "\n@media screen and (min-width: 769px) {"+
     "\n/* Rules when screen is wider than 768px */"+
    "\n}";

  ngOnInit() {
    this.onChange(this.code)

  }

  base_tpl: string =
    "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "<script>\n\t\n\t" +
    "</script>\n"
  "</html>";

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
  commentCss(){
    this.cssValue += " "+ this.commentsCss;
  }

  elementsSelector(){
    this.cssValue +=" "+ this.elementSelector;
  }

  class(){
    this.cssValue += " " + this.classSelector;
  }

  id() {
    this.cssValue += " " + this.idSelector;
  }

  mediaQuery(){
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

  /*  `
  <h2>Cursor Position : {{caretPos}}</h2>
  <div>
    <textarea rows="4" #myTextArea (click)="getCaretPos(myTextArea)" (keyup)="getCaretPos(myTextArea)" cols="40" >{{caretText}}</textarea>
  </div>
  <div>
  <button (click)="add()">click</button>
  `
*/
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
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}
}
