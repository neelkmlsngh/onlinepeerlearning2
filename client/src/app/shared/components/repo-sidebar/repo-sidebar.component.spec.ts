import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HttpModule,Http, ResponseOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/*import third party libraries*/
import { RepoSidebarComponent } from './repo-sidebar.component';
import { GitService } from '../../services/git.service';
import { EditorService } from '../../services/editor.service';
describe('RepoSidebarComponent', () => {
   let data: any;
  let component: RepoSidebarComponent;
  let fixture: ComponentFixture<RepoSidebarComponent>;
  let spy, spy1,spy2,spy3;
  let service: GitService;
  let test = {
    "response": { "n": 1, "ok": 1, "nModified": 1 },
    "repo": { "repositery": "angular" },
    "file": "index",
    "negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
    
  };
  let de: DebugElement;
  let el: HTMLInputElement;
 
  beforeEach(async(() => {
    data = test.response;
    TestBed.configureTestingModule({
    declarations: [ RepoSidebarComponent ],
    imports: [
        HttpModule,
        FormsModule
      ],
      providers: [{provide: GitService, useValue:service} ,EditorService,
        { provide: Http },
         { provide: BsModalService },
         { provide: ComponentFixtureAutoDetect, useValue: true }, 
      
        
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(RepoSidebarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      service = fixture.debugElement.injector.get(GitService);
      });
  }));
  //test for component whether created or not
/*  it('should created the repo-sidebar component', () => {
    expect(component).toBeTruthy();
  });
  //negative test for component whether created or not
  it('should not create the repo-sidebar component', () => {
    expect(component).not.toBeFalsy();
  });
//test case for showfile method
  it("testing the showfiles method", () => {
    fixture.detectChanges();
    spy1 = spyOn(service, 'openFolder').and.returnValue(Observable.of(data));
    component.showFile(test.repo.repositery, test.file);
    expect(component.data.n).toEqual(1);
    expect(component.data.nModified).toEqual(1);
    expect(component.data.ok).toEqual(1);
  });
  
  //negative test case for showfile method
  it("negative test for showfile() method", () => {
    fixture.detectChanges();
    spy1 = spyOn(service, 'openFolder').and.returnValue(Observable.of(data));
    component.showFile(test.repo.repositery, test.file);
    expect(component.data.n).not.toEqual(test.negativeResponse.n);
    expect(component.data.nModified).not.toEqual(test.negativeResponse.nModified);
    expect(component.data.ok).not.toEqual(test.negativeResponse.ok);
  });
//test case for show method
  it("testing the show() method", () => {
    fixture.detectChanges();
    spy = spyOn(service, 'getFile').and.returnValue(Observable.of(data));
    component. show(test.repo.repositery, test.file);
    expect(test.response.n).toEqual(1);
    expect(test.response.nModified).toEqual(1);
    expect(test.response.ok).toEqual(1);
  });
  
  //negative test case for show method
  it("negative test for show method", () => {
    fixture.detectChanges();
    spy = spyOn(service, 'getFile').and.returnValue(Observable.of(data));
    component.show(test.repo.repositery, test.file);
    expect(test.response.n).not.toEqual(test.negativeResponse.n);
    expect(test.response.nModified).not.toEqual(test.negativeResponse.nModified);
    expect(test.response.ok).not.toEqual(test.negativeResponse.ok);
  });*/
/*  //test case for createRepo method
  it("testing the createRepo method", () => {
    fixture.detectChanges();
    spy2 = spyOn(service, 'createRepos').and.returnValue(Observable.of(data));
    component. createRepo(test.repo.repositery, test.file);
    expect(test.response.n).toEqual(1);
    expect(test.response.nModified).toEqual(1);
    expect(test.response.ok).toEqual(1);
  });
  
  //negative test case for createRepo method
  it("negative test for createRepo method", () => {
    fixture.detectChanges();
    spy2 = spyOn(service, 'createRepos').and.returnValue(Observable.of(data));
    component.createRepo(test.repo.repositery, test.file);
    expect(test.response.n).not.toEqual(test.negativeResponse.n);
    expect(test.response.nModified).not.toEqual(test.negativeResponse.nModified);
    expect(test.response.ok).not.toEqual(test.negativeResponse.ok);
  });*/
  //test case for createRepo method
/*  it("testing the reposearch method", () => {
    fixture.detectChanges();
    spy3 = spyOn(service, 'getTree').and.returnValue(Observable.of(data));
    component. reposearch();
    expect(test.response.n).toEqual(1);
    expect(test.response.nModified).toEqual(1);
    expect(test.response.ok).toEqual(1);
  });
  
  //negative test case for reposearch method
  it("negative test for reposearch method", () => {
    fixture.detectChanges();
    spy3 = spyOn(service, 'getTree').and.returnValue(Observable.of(data));
    component.reposearch();
    expect(test.response.n).not.toEqual(test.negativeResponse.n);
    expect(test.response.nModified).not.toEqual(test.negativeResponse.nModified);
    expect(test.response.ok).not.toEqual(test.negativeResponse.ok);
  });*/
});