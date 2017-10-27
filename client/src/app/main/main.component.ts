import { Component, OnInit } from '@angular/core';
import { config } from '../shared/config/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  content:any;
  languages:any=[];
  mod:any;
  constructor() { }

  ngOnInit() {
  	this.languages=config.language;
  }

  mode(event) {
       alert(event.target.value);
    this.mod = event.target.value;
    console.log(this.mod);
     }

     getcontent(text){
       this.content=text;
       console.log("Main Component Data--> "+this.content)
     }

}
