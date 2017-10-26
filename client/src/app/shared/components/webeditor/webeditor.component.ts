import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms'
import{AceEditorDirective} from 'ng2-ace-editor'
import{AceEditorModule} from 'ng2-ace-editor'

@Component({
  selector: 'app-webeditor',
  templateUrl: './webeditor.component.html',
  styleUrls: ['./webeditor.component.css']
})
export class WebeditorComponent implements OnInit {
  htmlValue: any = "<h1>Hello World</h1>";
  cssValue: any = "body{color:red}";
  jsValue: any
  code: any;

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
    "<script>\n\t\n\t"+
    "</script>\n"
    "</html>";


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
    
    src= src.replace('</script>',this.jsValue+ '</script>');

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

}
