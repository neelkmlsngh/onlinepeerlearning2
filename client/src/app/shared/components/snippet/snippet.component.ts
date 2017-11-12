import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import swal from 'sweetalert2';
import { SnippetService } from '../../../shared/services/snippet.service'; 

@Component({
 selector: 'app-snippet',
 templateUrl: './snippet.component.html',
 styleUrls: ['./snippet.component.css']
})

export class SnippetComponent implements OnInit {

 constructor(private snippetService: SnippetService, private modalService: BsModalService) {}
 
 snippets: any;
 title: any;
 oldtitle: any
 selectedValue: any = "All";
 code: any;
 oldcode: any;
 language: any = "Html";
 oldlanguage: any;
 modalRef: BsModalRef;

 ngOnInit() {
  this.show();
 }

 openModal(template: TemplateRef<any>, data: any) {
     this.title = data.title;
   this.oldtitle = data.title;
     this.code = data.code;
   this.oldcode = data.code;
     this.language = data.language;
   this.oldlanguage = data.language;
   this.modalRef = this.modalService.show(template);
 }

 openModalAdd(template: TemplateRef<any>) {
   this.title = "";
     this.code = "";
     this.language = "";
   this.modalRef = this.modalService.show(template);
 }

 show() {
     this.snippetService.getSnippet()
  .subscribe(res=> this.snippets = res)
 }

 add() {
   let obj = {
     "title": this.title,
     "language": this.language,
     "code": this.code
   }
   this.snippetService.addSnippet(obj)
   .subscribe(res => {
     if (res) {
         swal({ //alert message for success
         timer: 1500,
         title: "Snippet Added Successfully",
         type: 'success',
         showConfirmButton: false,
       })
     }
     this.mode();
   })
   this.modalRef.hide();
 }

 edit() {
   if(this.oldtitle!=this.title || this.oldlanguage!=this.language || this.oldcode!=this.code)
   {
     let obj = {
     "oldtitle": this.oldtitle,
         "title": this.title,
         "language": this.language,
         "code": this.code
     }

     this.snippetService.updateSnippet(obj)
     .subscribe(res=> {
     if (res) {
         swal({ //alert message for success
         timer: 1500,
         title: "Snippet Edited Successfully",
         type: 'success',
         showConfirmButton: false,
       })
     }
     this.mode()
   })
}
this.modalRef.hide()
 }

 deleteSnip(title: any) {
     this.snippetService.deleteSnippet(title)
     .subscribe(res=> {
     if (res) {
         swal({ //alert message for success
         timer: 1500,
         title: "Deleted Successfully",
         type: 'success',
         showConfirmButton: false,
       })
     }
     this.mode()
   })
}

 mode() {
   if(this.selectedValue!="All"){
   this.snippetService.getSnippet()
   .subscribe(res => {
     this.snippets = res.filter((data)=> data.language == this.selectedValue);
   })
 }
 else
   this.show();
}
}