import { Component, OnInit, OnDestroy} from '@angular/core';
import * as $ from 'jquery';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css'],
  providers: [ChatService]
})

export class ChatSidebarComponent  {
  
}
