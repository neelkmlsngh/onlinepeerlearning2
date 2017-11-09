import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ForumsComponent } from './forums.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ForumService } from '../../services/forum.service';
import { AuthenticationService } from '../../services/authentication.service';
import { forumConfig } from './../../config/forum.config';
describe('ForumsComponent', () => {
  let data: any;
  let component: ForumsComponent;
  let fixture: ComponentFixture<ForumsComponent>;
  let de,dforums: DebugElement;
  let el,eforums: HTMLElement;
  let service;
  let spy,spy1, spy2: jasmine.Spy;
  let forumdata = {questionTitle:'what??',problemDescription:'because.' };
  //creating the stub data
  let test = {
    "response": { "n": 1, "ok": 1, "nModified": 1 },
    "questionTitle": { "title": "what is angular" },
    "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
    "likes":{"like":"2"},
    "dislikes":{"dislike":"2"}
  };
  beforeEach(async(() => {
    class RouterStub {
      navigate(url: string) { return url; }
    }
    data = test.response;
    TestBed.configureTestingModule({
        declarations: [ForumsComponent,NavbarComponent,FooterComponent],
        imports: [
          NgxPaginationModule,
          TruncateModule,
          HttpModule,
          FormsModule
        ],
        providers: [ForumService,
          { provide: AuthenticationService },
          { provide: Router, useClass: RouterStub },
          { provide: BsModalService }
        ]
      })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ForumsComponent);
        component = fixture.componentInstance;
         service = fixture.debugElement.injector.get(ForumService);
         spy = spyOn(service, 'getPost').and.returnValue(Observable.of(data));
         spy1 = spyOn(service, 'searchEntries').and.returnValue(Observable.of(data));
         spy2 = spyOn(service, 'updateLike').and.returnValue(Observable.of(data));
      })
  }));
   //test for component creation
  it('forum component should be created', () => {
    component=fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
  //negative test for component creation
  it('forum component should not be created', () => {
    component=fixture.debugElement.componentInstance;
    expect(component).not.toBeFalsy();
  });
 //test viewPost() method which call service method getPost()
  it('testing the get post detail method', () => {
    fixture.detectChanges();
    component.viewPost();
    expect(test.response.n).toEqual(1);
    expect(test.response.ok).toEqual(1);
    expect(test.response.nModified).toEqual(1);
  });
  //negative test viewPost() method which call service method getPost()
  it("negative test for get post detail method", () => {
    let negativeData = test.negativeResponse;
    component.viewPost();
    fixture.detectChanges();
    expect(test.response.n).not.toEqual(0);
    expect(test.response.nModified).not.toEqual(0);
    expect(test.response.ok).not.toEqual(0);
  });
  //test get getDetails() method which call service method searchEntries()
  it('testing the get detail method', () => {
    fixture.detectChanges();
    component.getDetails(test.response);
    expect(component.data.ok).toEqual(1);
  });
  //test to mock backend data
  it('should mock backend data', () => {
  fixture.detectChanges(); 
  expect(forumdata.questionTitle).toEqual('what??');
  expect(forumdata.problemDescription).toEqual('because.');
  });
  //test case for forums config check
  it('forums should come from config', () => {
    fixture.detectChanges();
    dforums = fixture.debugElement.query(By.css('.forom'));
    eforums = dforums.nativeElement;
    expect(eforums.textContent).toContain(forumConfig.VIEWPOST.ALL_QUESTIONS);
  });
  //negative test case for forums config check
  it('forums should not come from config', () => {
    fixture.detectChanges();
    dforums = fixture.debugElement.query(By.css('.forom'));
    eforums = dforums.nativeElement;
    forumConfig.VIEWPOST.ALL_QUESTIONS="question"
  expect(eforums.textContent).not.toContain("vidushi");
  });
//test like() method which call service method updateLike()
  it('testing the get post detail method', () => {
    fixture.detectChanges();
    component.like(test.likes.like);
    expect(test.response.n).toEqual(1);
    expect(test.response.ok).toEqual(1);
    expect(test.response.nModified).toEqual(1);
  });
//test dislike() method which call service method updateLike()
  it('testing the get post detail method', () => {
    fixture.detectChanges();
    component.dislike(test.dislikes.dislike);
    expect(test.response.n).toEqual(1);
    expect(test.response.ok).toEqual(1);
    expect(test.response.nModified).toEqual(1);
  });
//negative test like() method which call service method updatelike()
  it("negative test for like method", () => {
    let negativeData = test.negativeResponse;
    component.like(negativeData);
    fixture.detectChanges();
    expect(test.response.n).not.toEqual(negativeData.nModified);
    expect(test.response.nModified).not.toEqual(negativeData.n);
    expect(test.response.ok).not.toEqual(negativeData.ok);
  });
  
  //test to navigate when click on getPostDetail method
  it('should navigate when click happens on  getpostdetail',
  inject([Router], (router: Router) => {
  fixture.detectChanges();
  const spy3 = spyOn(router, 'navigate');
  de = fixture.debugElement.query(By.css(".question"));
  el = de.nativeElement;
  el.click();
  const navargs = spy1.calls.first().args[0];
  expect(navargs).toContain("/forums/view")
  }));
});