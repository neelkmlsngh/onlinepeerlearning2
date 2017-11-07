import { async, inject, TestBed } from '@angular/core/testing';
import {
 MockBackend,
 MockConnection
} from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';

import { AuthenticationService} from './authentication.service';
import { ForumService } from './forum.service';

describe('forumService ,(mockBackend)', () => {

 /*Initial configuration that will run before every testcase*/
 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpModule],
     providers: [
       ForumService,AuthenticationService,
       { provide: XHRBackend, useClass: MockBackend }
     ]
   });
 });

 /*Testcase to check whether service is injected or not*/
 it('can instantiate service when inject service',
   inject([ForumService], (service: ForumService) => {
     expect(service instanceof ForumService).toBe(true);
   }));

 /*Testcase to check whether mockdata is used instead of real database */
 it('can provide the mockBackend as XHRBackend',
   inject([XHRBackend], (backend: MockBackend) => {
     expect(backend).not.toBeNull('backend should be provided');
   }));

});
