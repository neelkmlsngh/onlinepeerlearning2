import { Component, OnInit,Input } from '@angular/core';
import { config } from '../shared/config/config';
import { GitService } from '../shared/services/git.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor( private gitService: GitService) { }
  
  content:any;
  languages:any=[];
  mod:any='html'
  githubUser:any;
  selectedValue: any;
  data: any;
  fileData: any;
  selectedfile: any;
  url: any = "";
  text: any ="enter code here";
 


ngOnInit() {
      this.languages=config.language;
    this.gitService.getRepos()
     .subscribe(repos => {
       this.githubUser = repos;   

     })
 }


reposearch(selected)
            {                
             
                this.gitService.getTree(selected)
                .subscribe(data=>{this.data=data
                 console.log(this.data)})
               
            }

 showFile(reponame, filename) {
   this.gitService.openFolder(reponame, filename)
     .subscribe(
       data => {
         this.data = data
         this.url = this.url + filename + "/"
         console.log(this.url)
       }
       , err => {
         this.show(reponame, this.url + filename)
         this.url = "";

       })
 }

 show(reponame, filename) {
   this.gitService.getFile(reponame, filename)
     .subscribe(data => {

       this.fileData = data;
       this.text = this.fileData._body;
       this.content.emit(this.text);
       console.log(JSON.stringify(this.text))
     })
 }
 




  mode(event) {
     
    this.mod = event;
     }

     getcontent(text){
       this.content=text;
     }


}
