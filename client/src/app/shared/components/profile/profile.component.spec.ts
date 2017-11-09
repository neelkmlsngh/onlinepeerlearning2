import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../services/profile.service';
import  {By} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
// import { RouterTestingModule } from '@angular/router/testing';
import {  Router} from '@angular/router';
import { HttpModule} from '@angular/http'
import {MatTabsModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ReactiveFormsModule, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Headers, RequestOptions } from '@angular/http';
import {config} from '../../config/profileConfig';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component'

describe('ProfileComponent', () => {
 let component: ProfileComponent;
 let fixture: ComponentFixture<ProfileComponent>;
 let desubmit,detitle:DebugElement;
 let elsubmit,eltitle:HTMLElement;
 let userId = "";

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ProfileComponent, NavbarComponent , FooterComponent],  
     imports : [FormsModule, MatTabsModule,MatButtonModule, HttpModule, ReactiveFormsModule,BrowserAnimationsModule],
     providers : [  ProfileService , {provide: Router}]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(ProfileComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should be created', () => {
   console.log(component)
   expect(component).toBeTruthy();
 });
});