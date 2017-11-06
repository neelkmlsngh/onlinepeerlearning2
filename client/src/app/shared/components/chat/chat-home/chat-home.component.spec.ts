import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { ChatHomeComponent } from './chat-home.component';

import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, RouterLinkWithHref } from '@angular/router';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule, Http, XHRBackend, ResponseOptions } from '@angular/http';
import {MatButtonModule} from '@angular/material';
import { MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {NO_ERRORS_SCHEMA} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { AuthenticationService } from './../../../services/authentication.service';
import { ProfileService } from './../../../services/profile.service';
import {chatConfig} from '../../../config/chatConfig';
import { SocketService } from './../../../services/chatservices/socket.service';
import { HttpService } from './../../../services/chatservices/http.service';
import { ChatService } from './../../../services/chatservices/chat.service';

describe('testing chat home component', () => {

 let component: ChatHomeComponent;
  let fixture: ComponentFixture<ChatHomeComponent> ;
  let de: DebugElement;
   let el : HTMLElement

  beforeEach(async(() => {

   TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule,FormsModule, ReactiveFormsModule,MatButtonModule,RouterModule],
      declarations: [ChatHomeComponent],
       //declaring component to be tested
      schemas:[NO_ERRORS_SCHEMA],
      providers: [{provide:SocketService},
      {provide:HttpService},
      {provide:ChatService},
      {provide:AuthenticationService},
      {provide:ProfileService},
      {provide:BsModalService}]
    }).compileComponents();
  }))

 beforeEach(() => {
   TestBed.configureTestingModule({
     declarations: [ChatHomeComponent]
   })
   .compileComponents();
    fixture = TestBed.createComponent(ChatHomeComponent);
    component = fixture.componentInstance;
    
})

/*Testcase to check whether component is created or not*/


it('should be created', () => {
   expect(component).toBeDefined();
  });


})