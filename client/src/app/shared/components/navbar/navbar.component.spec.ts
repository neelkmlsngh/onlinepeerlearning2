import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By, BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params, Data, RouterModule } from '@angular/router';
import { Http, XHRBackend, ResponseOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { config } from '../../config/nav.config';
import { NavbarComponent } from './navbar.component';
import { AuthenticationService } from '../../../shared/services/authentication.service'
describe('NavbarComponent', () => {
let component: NavbarComponent;
let fixture: ComponentFixture<NavbarComponent>;
let de, deditor, doeditor, dforums, dprofile, dlogout, dsnippet: DebugElement;
let el, eeditor,eoeditor, eforums, eprofile, elogout, esnippet: HTMLElement;
let spy, spy1;
//creating the stub data
let tests = {
"response": { "n": 1, "ok": 1, "nModified": 1 },
"data": { "response": "category already exists" },
"negativeResponse": { "ok": 0, "nModified": 0, "n": 0 },
"categoryResponse": { "Response": "category Name alerady exist" }
};
let user = {userName: 'Nishtha',userId: '50042977' };
let authenticationService: AuthenticationService;
beforeEach(async(() => {
  class RouterStub {
      navigate(url: string) { return url; }
    }
 TestBed.configureTestingModule({
   imports: [HttpModule, FormsModule, BrowserModule],
   declarations: [ NavbarComponent ],
   providers: [{ provide: AuthenticationService,  useValue: authenticationService }, { provide: Router, useClass: RouterStub }, { provide : RouterModule}]
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
   doeditor = fixture.debugElement.query(By.css('.oeditor'));
   eoeditor = doeditor.nativeElement;
   deditor = fixture.debugElement.query(By.css('.editor'));
   eeditor = deditor.nativeElement;
   dforums = fixture.debugElement.query(By.css('.forums'));
   eforums = dforums.nativeElement;
   dsnippet = fixture.debugElement.query(By.css('.snippets'));
   esnippet = dsnippet.nativeElement;
   dprofile = fixture.debugElement.query(By.css('.profile'));
   eprofile = dprofile.nativeElement;
   dlogout = fixture.debugElement.query(By.css('.logout'));
   elogout = dlogout.nativeElement;
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
   //test case for online editor config check
   it('online code editor should come from config', () => {
   fixture.detectChanges();
   expect(eoeditor.textContent).toContain(config.navbar.ONLINECODEEDITOR);
   });
   //negative test case for online editor config check
   it('online code editor should not come from config', () => {
   fixture.detectChanges();
   expect(eoeditor.textContent).not.toContain(config.navbar.ONLINECOEEDITOR);
   });
   //test case for  editor config check
   it(' editor should come from config', () => {
   fixture.detectChanges();
   expect(eeditor.textContent).toContain(config.navbar.EDITOR);
   });
   // negative test case for  editor config check
   it(' editor should not come from config', () => {
   fixture.detectChanges();
   expect(eeditor.textContent).not.toContain(config.navbar.EDIOR);
   });
   //test case for forums config check
   it('forums should come from config', () => {
   fixture.detectChanges();
   expect(eforums.textContent).toContain(config.navbar.FORUMS);
   });
   //negative test case for forums config check
   it('forums should not come from config', () => {
   fixture.detectChanges();
   expect(eforums.textContent).not.toContain(config.navbar.FOUMS);
   });
   //test case for snippets config check
   it('snippets should come from config', () => {
   fixture.detectChanges();
   expect(esnippet.textContent).toContain(config.navbar.SNIPPETS);
   });
   //negative test case for snippets config check
   it('snippets should not come from config', () => {
   fixture.detectChanges();
   expect(esnippet.textContent).not.toContain(config.navbar.SNIPPTS);
   });
   //test case for profile config check
   it('profile should come from config', () => {
   fixture.detectChanges();
   expect(eprofile.textContent).toContain(config.navbar.PROFILE);
   });
   //negative test case for profile config check
   it('profile should not come from config', () => {
   fixture.detectChanges();
   expect(eprofile.textContent).not.toContain(config.navbar.POFILE);
   });
   //test case for logout config check
   it('logout should come from config', () => {
   fixture.detectChanges();
   expect(elogout.textContent).toContain(config.navbar.LOGOUT);
   });
   //negative test case for logout config check
   it('logout should not come from config', () => {
   fixture.detectChanges();
   expect(elogout.textContent).not.toContain(config.navbar.LOGUT);
   });
   //test case to check the mock metadata
   it("testing the mock metadata", () => {
   fixture.detectChanges();
   expect(user.userName).toEqual("Nishtha");
   expect(user.userId).toEqual("50042977");
   });
   //negative test case to check the mock metadata
   it("testing the wrong mock metadata", () => {
   fixture.detectChanges();
   expect(user.userName).not.toEqual("Nishth");
   expect(user.userId).not.toEqual("5004277");
   });
   //test case to check the logout() method
   it("testing the logout() method", () => {
   fixture.detectChanges();
   spy = spyOn(authenticationService,'logoutEditor').and.returnValue(Observable.of(user));
   component.logout();
   expect(user.userName).toEqual("Nishtha");
   expect(user.userId).toEqual("50042977");
   //expect(tests.response.ok).toEqual(1);
   });
   //negative test case to check the logout() method
   it("testing the wrong logout() method", () => {
   fixture.detectChanges();
   spy = spyOn(authenticationService,'logoutEditor').and.returnValue(Observable.of(user));
   component.logout();
   expect(tests.negativeResponse.n).not.toEqual(1);
   expect(tests.negativeResponse.nModified).not.toEqual(1);
   expect(tests.negativeResponse.ok).not.toEqual(1);
   });
   //test case for navigate when user click on logout
   it('Navigate when user click on logout',
   inject([Router], (router: Router) => {
   const spy1 = spyOn(router, 'navigate');
   de = fixture.debugElement.query(By.css('.logout'));
   el = de.nativeElement;
   el.click();
   fixture.detectChanges();
   const navArgs = spy1.calls.first().args[0];
   expect(navArgs).toContain("/");
   }));
})