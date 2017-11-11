import { Component, OnInit, ViewChild, ElementRef, Input, NgZone, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormsModule } from '@angular/forms'
import { AceEditorDirective } from 'ng2-ace-editor'
import { AceEditorModule } from 'ng2-ace-editor'
import * as JSZip from 'jszip'
import { SnippetService } from '../../../shared/services/snippet.service';
import { webEditorConfig } from '../../config/webEditor.config';

@Component({
  selector: 'app-webeditor',
  templateUrl: './webeditor.component.html',
  styleUrls: ['./webeditor.component.css']
})
export class WebeditorComponent implements OnInit {

  constructor(private snippet: SnippetService, private zone: NgZone, private modalService: BsModalService) {
    this.methodToExport = this.calledFromOutside;
    window['angularComponentRef'] = { component: this, zone: zone };
  }
  config = webEditorConfig;

  @Input() content: any
  @Input() reponame: any;
  @Input() filenamed: any;

  htmlValue: any  = this.config.webEditor.HTMLTEMP;
  cssValue: any = this.config.webEditor.CSSTEMP;
  jsValue: any = this.config.webEditor.JSSTEMP;
  code: any;
  cssblob: any;
  htmlblob: any;
  jsblob: any;
  textcontent: any;
  html: any;
  css: any;
  caretPos: any;
  caretText: any;
  obj: any;
  windowRef: any;
  methodToExport: any;
  link: string = '';
  showModalBox:boolean = false;
  public modalRef: BsModalRef;

  /*variable for snippet used in css*/
  comments: any;
  tabels: string;
  unordered: any;
  forms: any;
  includeJs: any;
  includeCss: any;

  /*variable for snippet used in css*/
  commentsCss: any;
  elementSelector: any;
  classSelector: any;
  idSelector: any;
  mediaQueries: any;

  public openModal(template: TemplateRef < any > ) {
    if(this.showModalBox==false){
    this.modalRef = this.modalService.show(template);
  }
    this.showModal();
  }

  showModal() {
   this.showModalBox = !this.showModalBox;
 }
  calledFromOutside(url: string) {
    this.zone.run(() => {
      this.link = url;
    });
  }

  ngOnInit() {
    this.content=this.htmlValue;
    this.onChange(this.code)

    this.snippet.getSnippet()
      .subscribe(res => {

        this.html = res.filter(ele => ele.language === 'Html');
        this.css = res.filter(ele => ele.language === 'CSS');

      })
  }

/*snippet show in html editor*/
  showHtml(code) {
    this.content += " " + code;
  }

/*snippet show in css editor*/
 showCss(code) {
     this.cssValue+= " " + code;
  }

  /*Giving the basic syntax of an HTMl page on Iframe*/
  base_tpl: string = this.config.webEditor.OUTPUTTEMP;
  
  prepareSource() {
    let src = '';
    let css = '';
    let js = '';
    // HTML
    src = this.base_tpl.replace('</body>', this.content + '</body>');
    // CSS
    css = '<style>' + this.cssValue + '</style>';
    src = src.replace('</head>', css + '</head>');
    //Js
    src = src.replace('</script>', this.jsValue + '</script>');
    return src;
  };

  /*To return value in iframe*/
  render() {
    let source = this.prepareSource();
    let iframe = document.querySelector('#output iframe')
    
    let iframe_doc = iframe['contentDocument'];

    iframe_doc.open();
    iframe_doc.write(source);
    iframe_doc.close();
  };

  /*Method to pass the value directly into iframe*/
  onChange(code) {
    this.render();
  }

  cm_opt: any = {
    mode: 'text/html',
    gutter: true,
    lineNumbers: true,
  };
  /*HTML snippet methods start*/
  comment() {
    this.content += " " + this.comments;
  }

  table() {
    this.content += " " + this.tabels;
  }

  unodered() {
    this.content += " " + this.unordered;
  }
  form() {
    this.content += " " + this.forms;
  }
  includeJS() {
    this.content += " " + this.includeJs;
  }
  includeCSS() {
    this.content += " " + this.includeCss;
  }
  /*HTML snippet methods ends*/

  /*css snippet methods start*/
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
  /*css snippet methods ends*/

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

    var blob = new Blob([this.content]);
    this.htmlblob = blob;
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = this.config.download.HTML_FILE;
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
    downloadLink.download = this.config.download.CSS_FILE;
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
    downloadLink.download = this.config.download.JAVASCRIPT_FILE;
    let parent = document.getElementById('myJsDiv');
    parent.appendChild(downloadLink);
    downloadLink.click();
    parent.removeChild(downloadLink);
    return false;
  }

  /*download Zip file*/
  downloadZip() {
    var zip = new JSZip();
    zip.file(this.config.download.HTML_FILE, this.content);
    zip.file(this.config.download.CSS_FILE, this.cssValue);
    zip.file(this.config.download.JAVASCRIPT_FILE, this.jsValue);
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
