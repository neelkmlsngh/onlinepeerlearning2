import { Component, OnInit, ViewChild } from '@angular/core';
 
@Component({
  selector: 'app-audio-chat',
  templateUrl: './audio-chat.component.html',
  styleUrls: ['./audio-chat.component.css']
})
export class AudioChatComponent implements OnInit {
  
  @ViewChild('myaudio') myAudio: any;
  
  peer;
  anotherid;
  mypeerid;
  
  constructor() {
    
  }
  
  ngOnInit() {
    let audio = this.myAudio.nativeElement;
    this.peer = new Peer({host: '192.168.252.33', port: 8081, path: '/peerjs'});

    setTimeout(() => {
      this.mypeerid = this.peer.id;
    },3000);
    
    this.peer.on('connection', function(conn) {
  conn.on('data', function(data){
    console.log(data);
  });
});
 
 var n = <any>navigator;
    
    n.getUserMedia =  ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );
    
    this.peer.on('call', function(call) {
      
      n.getUserMedia({video: false, audio: true}, function(stream) {
        call.answer(stream);
        call.on('stream', function(remotestream){
          audio.src = URL.createObjectURL(remotestream);
          audio.play();
        })
      }, function(err) {
        console.log('Failed to get stream', err);
      })
    })
  }
  
  connect(){
    var conn = this.peer.connect(this.anotherid);
conn.on('open', function(){
  conn.send('Message from that id');
});
  }
  
  audioconnect(){
    let audio = this.myAudio.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherid;
    
    var n = <any>navigator;
    
    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    
    n.getUserMedia({video: false, audio: true}, function(stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        audio.src = URL.createObjectURL(remotestream);
        audio.play();
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }
}