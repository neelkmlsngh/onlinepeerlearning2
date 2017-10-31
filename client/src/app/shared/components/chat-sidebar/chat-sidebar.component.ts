import { Component, OnInit, OnDestroy, NgZone} from '@angular/core';
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
  chat: any = null;

  constructor(private chatService: ChatService) {
  }


  ngOnInit() {
     this.connection = this.chatService.getOnlineUsers().subscribe(user => {
      this.users=user;
      
    }) 
   /*$(document).ready(function(){
        $('.togetherjs-dock-right').hide();
    });*/


  }


/*sh(){
  $('#textbx').toggle();
}*/

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
