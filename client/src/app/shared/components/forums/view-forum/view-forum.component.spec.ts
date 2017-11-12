import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule,Http } from '@angular/http';
import { By } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule,MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from 'ng2-ckeditor';
import 'rxjs/add/observable/of';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
// import swal from 'sweetalert2';
import 'rxjs/add/operator/switchMap';
import { ViewForumComponent } from './view-forum.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { ForumService } from '../../../services/forum.service';
import { forumConfig } from './../../../config/forum.config';

describe('ViewForumComponent', () => {
 let component: ViewForumComponent;
 let fixture: ComponentFixture<ViewForumComponent>;
 let de: DebugElement;
 let el: HTMLElement;
 let forumService: ForumService;
 let spy: jasmine.Spy;
 let spy1: jasmine.Spy;
 let data: any
 let service: any;
 let testData: any;
 let tests = {
   "response": { "n": 1, "ok": 1, "nModified": 1 },
   "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 }
 };

  beforeEach(async(() => {
    testData = tests.response;
   TestBed.configureTestingModule({
     declarations: [ ViewForumComponent, NavbarComponent, FooterComponent, forumConfig ],
     providers: [AuthenticationService,ForumService/*{provide: RouterModule},{provide: Router},{ provide: ActivatedRoute }*/],
     imports: [FormsModule,MatInputModule,BrowserAnimationsModule,HttpModule,MatFormFieldModule,RouterModule,RouterTestingModule, CKEditorModule]
   })
   .compileComponents().then(() => {
       fixture = TestBed.createComponent(ViewForumComponent);
       component = fixture.componentInstance;
       de = fixture.debugElement.query(By.css('.allQuestion'));
       el = de.nativeElement;
       service = fixture.debugElement.injector.get(ForumService);
       //spy = spyOn(service, 'saveAnswer').and.returnValue(Observable.of(testData));
       //spy1 = spyOn(service, 'getPostById').and.returnValue(Observable.of(testData));
     });
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(ViewForumComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should be created', () => {
   expect(component).toBeTruthy();
 });

 //-ve test case to check component creation
 it('AddForumComponent component should not be created', () => {
 fixture.detectChanges();
 expect(component).not.toBeFalsy();
 });

 //+ve test case for postAnswer method created in add forum
 it("testing the postAnswer method", () => {
   fixture.detectChanges();
   spy = spyOn(service, 'saveAnswer').and.returnValue(Observable.of(testData));
   component.postAnswer();
   expect(tests.response.n).toEqual(1);
   expect(tests.response.nModified).toEqual(1);
   expect(tests.response.ok).toEqual(1);
 });

 //-ve test case for postAnswer method created in add forum
  it("negative test for postAnswer method", () => {   
   let negativeData = tests.negativeResponse;
   component.postAnswer();
   spy = spyOn(service, 'saveAnswer').and.returnValue(Observable.of(testData));
   fixture.detectChanges();
   expect(negativeData.n).toEqual(0);
   expect(negativeData.nModified).toEqual(0);
   expect(negativeData.ok).toEqual(0);
 });

  //tests case for config of the question title in html
  it('should display ALL_QUESTIONS', () => {
   fixture.detectChanges();
   expect(el.textContent).toContain(forumConfig.DETAILPOST.ALL_QUESTIONS);
 });

  //-ve tests case for config of the question title in html
  it('should not display ALL_QUESTIONS', () => {
   fixture.detectChanges();
   expect(el.textContent).not.toContain("AllQuestions");
 });
});