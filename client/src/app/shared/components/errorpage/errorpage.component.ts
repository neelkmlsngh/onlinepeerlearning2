//imports required from angular

import { Component, OnInit } from '@angular/core';

import { errorConfig } from '../../config/errorConfig'

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})

//error component class starts

export class ErrorpageComponent implements OnInit {

	config = errorConfig;

	//constructor

  constructor() { }

  //ngOnInit

  ngOnInit() {
  }

}
