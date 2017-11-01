import { Component, OnInit, OnDestroy, NgZone, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';

import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css'],
  providers: [ChatService]
})
export class ChatSidebarComponent  {
  connection;
  users:any;
  chat: any = null;
  windowRef:any;
  methodToExport:any;
  link:string='';

  constructor(private chatService: ChatService, private zone: NgZone) {
    this.methodToExport=this.calledFromOutside;
    window['angularComponentRef'] = {component: this, zone: zone};
  }
  
calledFromOutside(url:string) {
    this.zone.run(() => {
      this.link=url;
    });
  }

  ngOnInit() {
  /*   this.connection = this.chatService.getOnlineUsers().subscribe(user => {
      this.users=user;
      
    }) */
   /*$(document).ready(function(){
        $('.togetherjs-dock-right').hide();
    });*/


  }
  ngAfterViewInit() {
   console.log($('.togetherjs-dock-right'))
    $('#togetherjs-dock').hide();
  }

  screenShare(call) {
     this.windowRef= window;
     if (this.windowRef.TogetherJS) {
         this.windowRef.TogetherJS();

         setTimeout(function(){
                $('.togetherjs-dock-right').remove();
                this.screenSharingLink=$('.togetherjs-share-link').val();
                console.log("=======11111",this.screenSharingLink);
                $('#togetherjs-share').remove();
                $('#togetherjs-window-pointer-right').remove();
            },100)
     }
}
sh(){
  $('#textbx').toggle();
}

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
 username(name){
 this.chat=name;
 
 var $chatbox = $('.chatbox');

  $chatbox.toggleClass('chatbox--tray');
   $chatbox.removeClass('chatbox--tray')
 setTimeout(()=>{
$('.chatbox').removeClass('chatbox--tray')
 },500);
 
   }
}
