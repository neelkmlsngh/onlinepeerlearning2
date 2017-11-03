import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import * as $ from 'jquery';
import { AuthenticationService } from './../../../services/authentication.service';

/*importing services starts*/
import { SocketService } from './../../../services/chatservices/socket.service';
import { HttpService } from './../../../services/chatservices/http.service';
import { ChatService } from './../../../services/chatservices/chat.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})

export class ChatHomeComponent implements OnInit {

  /*ui related variables starts*/
  public modalRef: BsModalRef;
  overlayDisplay = false;
  selectedUserId = null;
  selectedSocketId = null;
  selectedUserName = null;

  //chat and message related variables starts
  userId = null;
  socketId = null;
  chatListUsers = [];
  message = '';
  messages = [];
  data2: any = [];

  //constructor initialising various services
  constructor(
    private chatService: ChatService,
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private authenticationService: AuthenticationService
  ) {}

  /*method loading various functions*/
  ngOnInit() {
    $('.chatbox').hide();

    // getting userID from the local storage	
    this.userId = this.authenticationService.getUserId();
    if (this.userId === '' || typeof this.userId == 'undefined') {
      this.router.navigate(['/']);
    } else {
      this.chatService.userSessionCheck(this.userId, (error, response) => {
        if (error) {
          this.router.navigate(['/']); /* Home page redirection */
        } else {
          this.overlayDisplay = true;

          // making socket connection by passing UserId.  
          this.socketService.connectSocket(this.userId);

          // calling method of service to get the online users list.  
          this.socketService.getChatList(this.userId).subscribe(response => {
            if (!response.error) {
              if (response.singleUser) {

                // Removing duplicate user from online users list array.
                if (this.chatListUsers.length > 0) {
                  this.chatListUsers = this.chatListUsers.filter(function(obj) {
                    return obj._id !== response.chatList._id;
                  });
                }
                this.chatListUsers.push(response.chatList);
              } else if (response.userDisconnected) {
                this.chatListUsers = this.chatListUsers.filter(function(obj) {
                  return obj.socketId !== response.socketId;
                });
              } else {

                //Updating online userslist if user logs in.
                this.chatListUsers = response.chatList;
              }
            } else {
              alert(`Chat list failure.`);
            }
          });

          //method for recieving messages through socket					
          this.socketService.receiveMessages().subscribe(response => {
            if (this.selectedUserId && this.selectedUserId == response.fromUserId) {
              this.messages.push(response);
              setTimeout(() => {
                document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
              }, 100);
            }
          });
        }
      });
    }
  }

  //Getting the userid when user is selected
  selectedUser(user): void {

    this.selectedUserId = user.userId;
    this.selectedSocketId = user.socketId;
    this.selectedUserName = user.userName;

    this.chatService.getMessages({ userId: this.userId, toUserId: user.userId }, (error, response) => {
      if (!response.error) {
        this.messages = response.messages;

      }
    });
    this.openchatbox()
    this.hidechatbox()
  }

  //Method for opening chatbox
  openchatbox(): void {
  	//Jquery for handling chatbox opening and closing
    var $chatbox = $('.chatbox'),
      $chatboxTitle = $('.chatbox__title'),
      $chatboxTitleClose = $('.chatbox__title__close'),
      $chatboxTitleTray = $('.chatbox__title__tray'),
      $chatboxCredentials = $('.chatbox__credentials');

    $chatboxTitle.on('click', function() {
      $chatbox.toggleClass('chatbox--tray');

    });
    $chatboxTitleClose.on('click', function(e) {
      $chatbox.hide();

    });
    $chatbox.on('transitionend', function() {
      if ($chatbox.hasClass('chatbox--closed'))
        $chatbox.hide();
    });
    $chatboxCredentials.on('submit', function(e) {
      e.preventDefault();
      $chatbox.removeClass('chatbox--empty');
    });
    $('#myhead').on('click', function() {
      $chatbox.toggleClass('chatbox--tray');
    });
    $chatboxTitleTray.on('click', function() {
      $chatbox.toggleClass('chatbox--tray');
    });
  }

  //Method for closing chatbox
  hidechatbox(): void {
    $('.chatbox').show();
    $('.side').hide();
  }

  isUserSelected(userId: string): boolean {
    if (!this.selectedUserId) {
      return false;
    }
    return this.selectedUserId === userId ? true : false;
  }

  //Method for sending the messages
  sendMessage(event) {
    if (event.keyCode === 13) {
      if (this.message === '' || this.message === null) {
        alert(`Message can't be empty.`);
      } else {
        if (this.message === '') {
          alert(`Message can't be empty.`);
        } else if (this.userId === '') {
          this.router.navigate(['/']);
        } else if (this.selectedUserId === '') {
          alert(`Select a user to chat.`);
        } else {
          let data: any = {
            fromUserId: this.userId,
            message: (this.message).trim(),
            toUserId: this.selectedUserId,
            toSocketId: this.selectedSocketId,
            fromSocketId: this.socketId
          }
          this.messages.push(data);

          // alert(JSON.stringify(this.messages[0]))
          setTimeout(() => {
            document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
          }, 100);
          this.message = null;
          this.socketService.sendMessage(data);
        }
      }
    }
  }

  alignMessage(userId) {
    return this.userId === userId ? false : true;
  }

  removesb() {
    $('.side').toggle();
  }

  //Method for audio chat
  audiocall(template1: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template1);
  }

  //Method for calling video chat
  videocall(template2: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template2);
  }
}






