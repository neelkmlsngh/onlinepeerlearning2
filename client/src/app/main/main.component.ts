import { Component, OnInit } from '@angular/core';
import { config } from '../shared/config/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  languages:any=[];
  constructor() { }

  ngOnInit() {
  	this.languages=config.language;
  }

}
