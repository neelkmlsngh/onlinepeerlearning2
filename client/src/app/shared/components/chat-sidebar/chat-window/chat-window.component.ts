import { Component, OnInit , OnDestroy  } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [ChatService]
})

export class ChatWindowComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

 ngOnDestroy() {
    this.connection.unsubscribe();
  }
}