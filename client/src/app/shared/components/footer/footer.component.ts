import { Component, OnInit } from '@angular/core';
import { config } from './../../config/config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
 /*FooterComponent class*/
export class FooterComponent implements OnInit {

	config = config

  constructor() { }

  ngOnInit() {
  }

}
