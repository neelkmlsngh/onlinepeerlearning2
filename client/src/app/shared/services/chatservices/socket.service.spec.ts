import { async, inject, TestBed } from '@angular/core/testing';
import {
 MockBackend,
 MockConnection
} from '@angular/http/testing';

import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SocketService as socketservice } from './socket.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

describe('socketService ,(mockBackend)', () => {


 /*Initial configuration that will run before every testcase*/
 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpModule],
     providers: [
       socketservice,HttpModule,
       { provide: XHRBackend, useClass: MockBackend }
     ]
   });
 });

/*it('connectSocket method should create connection.',
    inject([socketservice, XHRBackend], (socketservice, mockBackend) => {
      const mockResponse = { userId:'rohan1194'};
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      socketservice.connectSocket("username","true, 'HTTP fail.").subscribe((user) => {
        expect(user.userId).toEqual('rohan1194');
      });
   
}));

it('sendMessage method should send message.',
    inject([socketservice, XHRBackend], (socketservice, mockBackend) => {
      const mockResponse = { message:'hello'};
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      socketservice.sendMessage("username","true, 'HTTP fail.").subscribe((user) => {
        expect(user.message).toEqual('hello');
      });*/



      /*  it('should xyz, inject([JobService], fakeAsync((service: JobService) => {
    service.subscribeEvent('/').subscribe(val => {
      expect(val).toEqual('test message 1');
    })*/
   
/*}));

it('getChatList method should return list of online users.',
    inject([socketservice, XHRBackend], (socketservice, mockBackend) => {
      const mockResponse = { userId:'rohan1194'};
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      socketservice.getChatList("username","true, 'HTTP fail.").subscribe((user) => {
        expect(user.userId).toEqual('rohan1194');
      });
   
}));


 /*Testcase to check whether service is injected or not*/
 it('can instantiate service when inject service',
   inject([socketservice], (service: socketservice) => {
     expect(service instanceof socketservice).toBe(true);
   }));

 /*Testcase to check whether mockdata is used instead of real database */
 it('can provide the mockBackend as XHRBackend',
   inject([XHRBackend], (backend: MockBackend) => {
     expect(backend).not.toBeNull('backend should be provided');
   }));

 /*Testcase to check whether instance of service is created or not*/
 it('can instantiate service with "new"', inject([Http], () => {
   //expect().not.toBeNull('http should be provided');
   let service = new socketservice();
   expect(service instanceof socketservice).toBe(true, 'new service should be ok');
 }));

})
