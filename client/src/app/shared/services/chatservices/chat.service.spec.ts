import { async, inject, TestBed } from '@angular/core/testing';
import {
 MockBackend,
 MockConnection
} from '@angular/http/testing';

import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService as httpservice } from './http.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { ChatService as chatservice } from './chat.service';

describe('chatService ,(mockBackend)', () => {


 /*Initial configuration that will run before every testcase*/
 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpModule],
     providers: [
       chatservice,httpservice,HttpModule,
       { provide: XHRBackend, useClass: MockBackend }
     ]
   });
 });

it('GetMessages method should return messages',
    inject([chatservice, XHRBackend], (chatservice, mockBackend) => {
      const mockResponse = { params:'username',call:"true, 'HTTP fail."};
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      chatservice.getMessages("username","true, 'HTTP fail.").subscribe((user) => {
        expect(user.params).toEqual('username');
        //expect(user.callback()).toEqual("true, 'HTTP fail.");

      });

   
}));










 /*Testcase to check whether service is injected or not*/
 it('can instantiate service when inject service',
   inject([chatservice], (service: chatservice) => {
     expect(service instanceof chatservice).toBe(true);
   }));

 /*Testcase to check whether mockdata is used instead of real database */
 it('can provide the mockBackend as XHRBackend',
   inject([XHRBackend], (backend: MockBackend) => {
     expect(backend).not.toBeNull('backend should be provided');
   }));

 /*Testcase to check whether instance of service is created or not*/
 it('can instantiate service with "new"', inject([Http], ( http: httpservice) => {
   expect(http).not.toBeNull('http should be provided');
   let service = new chatservice(http);
   expect(service instanceof chatservice).toBe(true, 'new service should be ok');
 }));

})
