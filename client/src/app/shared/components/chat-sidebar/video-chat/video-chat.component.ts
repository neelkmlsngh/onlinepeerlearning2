import { Component, OnInit, ViewChild } from '@angular/core';

 
@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {
  
  @ViewChild('myvideo') myVideo: any;
 
  
  peer;
  anotherid;
  mypeerid;
 
 
constructor() { }
 

  
 ngOnInit() {
    let video = this.myVideo.nativeElement;
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
      
      n.getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream);
        call.on('stream', function(remotestream){
          video.src = URL.createObjectURL(remotestream);
          video.play();
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
  
  videoconnect(){
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherid;
    
    var n = <any>navigator;
    
    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    
    n.getUserMedia({video: true, audio: true}, function(stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.src = URL.createObjectURL(remotestream);
        video.play();
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }


  stop(){
     
    var conn = this.peer.destroy(this.anotherid);
    
conn.on('close', function(){
  conn.send('End Call');
 
 
});
  }

    /*mute() {
  

    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherid;
    
    var n = <any>navigator;
    
    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    
    n.getUserMedia({video: true, audio: false}, function(stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.src = URL.createObjectURL(remotestream);
        video.pause();
      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }*/

    mute() {
    let video=this.myVideo.nativeElement;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio:false,video:true })
                            .then(stream => {
                              video.src = window.URL.createObjectURL(stream);
                              video.play();
                            })
    }

  }

}