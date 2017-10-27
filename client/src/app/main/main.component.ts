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
  mod:any='JAVASCRIPT'
  constructor() { }

  ngOnInit() {
  	this.languages=config.language;
  }

  mode(event) {
     
    this.mod = event.target.value;
     }

     getcontent(text){
       this.content=text;
     }


}
