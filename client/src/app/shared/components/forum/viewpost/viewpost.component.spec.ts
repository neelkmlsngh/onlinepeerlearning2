import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Http, XHRBackend, ResponseOptions, HttpModule } from '@angular/http';
import { inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncateModule } from 'ng2-truncate';

import { ViewpostComponent } from './viewpost.component';
import { ForumService } from '../../../services/forum.service';
import { AuthenticationService } from './../../../services/authentication.service';

describe('ViewpostComponent', () => {

  let data: any;
  let component: ViewpostComponent;
  let fixture: ComponentFixture < ViewpostComponent > ;
  let de: DebugElement;
  let el: HTMLElement;
  let service;
  let spy: jasmine.Spy;
  let test = {
    "response": { "n": 1, "ok": 1, "nModified": 1 },
    "questionTitle": { "title": "what is angular" },
    "negativeResponse": { "ok": "0", "nModified": "0", "n": "0" },
  };


  beforeEach(async(() => {
    class RouterStub {
      navigate(url: string) { return url; }
    }
    data = test.response;
    TestBed.configureTestingModule({
        declarations: [ViewpostComponent],
        imports: [
          NgxPaginationModule,
          TruncateModule,
          HttpModule,
        ],
        providers: [
          { provide: ForumService },
          { provide: AuthenticationService },
          { provide: Router, useClass: RouterStub },
          { provide: BsModalService }
        ]

      })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ViewpostComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(ForumService);
        spy = spyOn(service, 'getPost').and.returnValue(Observable.of(data));
      })
  }));

 //test getQuestionDetails() method which call service method getPost()
  it('testing the get post detail method', () => {
    fixture.detectChanges();
    component.viewPost();
    expect(component.data.n).toEqual(1);
    expect(component.data.ok).toEqual(1);
    expect(component.data.nModified).toEqual(1);
  });

  //negative test getQuestionDetails() method which call service method getPost()
  it("negative test for get post detail method", () => {
    let negativeData = test.negativeResponse;
    component.viewPost();
    fixture.detectChanges();
    expect(component.data.n).not.toEqual(negativeData.nModified);
    expect(component.data.nModified).not.toEqual(negativeData.n);
    expect(component.data.ok).not.toEqual(negativeData.ok);
  });

   it('should navigate when click happens on  getpostdetail',
    inject([Router], (router: Router) => {
      const spy1 = spyOn(router, 'navigate');
      de = fixture.debugElement.query(By.css(".question"));
      console.log(de)
      el = de.nativeElement;
      el.click();
      const navargs = spy1.calls.first().args[0];
      expect(navargs).toContain("/questiondetail/:5")
    }));
});
