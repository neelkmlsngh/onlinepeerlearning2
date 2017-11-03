  import { Component, OnInit, ViewChild } from '@angular/core';
  import { Router } from '@angular/router'
  import { config } from '../../../config/config'


  @Component({
    selector: 'app-audio-chat',
    templateUrl: './audio-chat.component.html',
    styleUrls: ['./audio-chat.component.css']
  })

  export class AudioChatComponent implements OnInit {

    @ViewChild('myaudio') myAudio: any; // id for audio tag
    peer;
    anotherid;
    mypeerid;

    constructor(private router: Router) {}

    ngOnInit() {
      let audio = this.myAudio.nativeElement; //audio tag native element
      this.peer = new Peer({ host: config.peer.host, port: config.peer.port, path: config.peer.path }); //peer server connection
      setTimeout(() => {
        this.mypeerid = this.peer.id;
      }, 3000);

      //on peer connection 
      this.peer.on('connection', function(conn) {
        conn.on('data', function(data) {});
      });

      //navigate user media devices 
      let n = < any > navigator;
      n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

      //answer the call
      this.peer.on('call', function(call) {
        n.getUserMedia({ video: false, audio: true }, function(stream) {
          call.answer(stream);
          call.on('stream', function(remotestream) {
            audio.src = URL.createObjectURL(remotestream);
            audio.play();
          })
        }, function(err) {})
      })
    }

    //establish the peer connection
    connect() {
      let conn = this.peer.connect(this.anotherid);
      conn.on('open', function() {
        conn.send('Message from that id');
      });
    }

    //audio call connect
    audioConnect() {
      let audio = this.myAudio.nativeElement;
      let localvar = this.peer;
      let fname = this.anotherid;

      let n = < any > navigator;

      n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);

      n.getUserMedia({ video: false, audio: true }, function(stream) {
        let call = localvar.call(fname, stream);
        call.on('stream', function(remotestream) {
          audio.src = URL.createObjectURL(remotestream);
          audio.play();
        })
      }, function(err) {})
    }

    //audio call disconnect
    audioDisconnect() {
      let conn = this.peer.destroy(this.anotherid);
      conn.on('close', function() {
        conn.send('End Call');
      });
    }
  }
