import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params, Data, RouterModule } from '@angular/router';
import { Http, XHRBackend, ResponseOptions, HttpModule } from '@angular/http';
import { inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { NavbarComponent } from './navbar.component';
import { AuthenticationService } from '../../../shared/services/authentication.service'

describe('NavbarComponent', () => {

let component: NavbarComponent;
let fixture: ComponentFixture<NavbarComponent>;
let de:      DebugElement;
let el:      HTMLElement;
let spy, spy1;
//creating the stub data
let tests = {
"response": { "n": 1, "ok": 1, "nModified": 1 },
"data": { "response": "category already exists" },
"negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
"categoryResponse": { "Response": "category Name alerady exist" }
};
const authdata = {userName: 'Nishtha',userId: '50042977' };
let authenticationService: AuthenticationService;

beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [HttpModule, FormsModule, BrowserModule],
    declarations: [ NavbarComponent ],
    providers: [{ provide: AuthenticationService,  useValue: authenticationService }, { provide : Router}, { provide : RouterModule}]
  })
  .compileComponents();
}));

beforeEach(() => {
      TestBed.configureTestingModule({
    declarations: [ NavbarComponent ]
  })
      .compileComponents();
  fixture = TestBed.createComponent(NavbarComponent);
  component = fixture.componentInstance;

    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
});

  //test case to check component creation
  it('navbar component should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

//negative test case to check component creation
  it('navbar component should not be created', () => {
    fixture.detectChanges();
    expect(component).not.toBeFalsy();
  });

  //test case to check the mock metadata
    it("testing the mock metadata", () => {
    fixture.detectChanges();
    expect(authdata.userName).toEqual("Nishtha");
    expect(authdata.userId).toEqual("50042977");
    });

    //negative test case to check the mock metadata
    it("testing the wrong mock metadata", () => {
    fixture.detectChanges();
    expect(authdata.userName).not.toEqual("Nishth");
    expect(authdata.userId).not.toEqual("5004277");
    });

    //test case to check the logout() method
    it("testing the logout() method", () => {
    fixture.detectChanges();
    spy = spyOn(authenticationService,'logoutEditor').and.returnValue(Observable.of(authdata));
    component.logout();
    expect(tests.response.n).toEqual(1);
    expect(tests.response.nModified).toEqual(1);
    expect(tests.response.ok).toEqual(1);
    });
});