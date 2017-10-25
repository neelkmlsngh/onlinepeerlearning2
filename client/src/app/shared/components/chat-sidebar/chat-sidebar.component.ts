import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css'],
  providers: [ChatService]
})
export class ChatSidebarComponent implements OnInit, OnDestroy {
  connection;
  users:any;
  windowRef:any;
  constructor(private chatService: ChatService) {}
  ngOnInit() {
    this.connection = this.chatService.getOnlineUsers().subscribe(user => {
      this.users=user;
      
    })
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
      },1000)
   }
 }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
