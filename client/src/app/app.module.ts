import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import {MatTabsModule} from '@angular/material';
import{MatTabGroup} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import { ModalModule } from 'ngx-bootstrap';
import { AceEditorModule } from 'ng2-ace-editor'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './shared/components/editor/editor.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RepoSidebarComponent } from './shared/components/repo-sidebar/repo-sidebar.component';
import { ChatSidebarComponent } from './shared/components/chat-sidebar/chat-sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { GitService } from './shared/services/git.service'
import { EditorService } from './shared/services/editor.service';
import { ChatService } from './shared/services/chat.service';
import { ChatWindowComponent } from './shared/components/chat-sidebar/chat-window/chat-window.component';
import { MainComponent } from './main/main.component';
import { ForumComponent } from './shared/components/forum/forum.component';
import { ViewpostComponent } from './shared/components/forum/viewpost/viewpost.component';
import { DetailpostComponent } from './shared/components/forum/detailpost/detailpost.component';
import { NewpostComponent } from './shared/components/forum/newpost/newpost.component';
import {  ForumService } from './shared/services/forum.service';
import { CKEditorModule } from 'ng2-ckeditor';
import {LoginService} from './home/service/login.service'
import { WebeditorComponent } from './shared/components/webeditor/webeditor.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';

import { FanMenuModule } from 'ng2-fan-menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AudioChatComponent } from './shared/components/chat-sidebar/audio-chat/audio-chat.component';
import { VideoChatComponent } from './shared/components/chat-sidebar/video-chat/video-chat.component';

import {AuthenticationService} from './shared/services/authentication.service'
import { ProfileService } from './shared/services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    NavbarComponent,
    RepoSidebarComponent,
    ChatSidebarComponent,
    FooterComponent,
   ChatWindowComponent,
    WebeditorComponent,
    ProfileComponent,
    MainComponent,
    ViewpostComponent,
    DetailpostComponent,
    NewpostComponent,
    ForumComponent,
    WebeditorComponent,
    AuthenticateComponent,
    AudioChatComponent,
    VideoChatComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FanMenuModule,
    CKEditorModule,
    BrowserAnimationsModule,
    AceEditorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,

    ModalModule.forRoot(),
    RouterModule.forRoot([

    {
       path:'home',
       component:HomeComponent
     },
     {
        path: 'main',
        component: MainComponent
      },
        {
        path: 'questions',
        component: ViewpostComponent
      },
      {

       path:'chat-window',
       component:ChatWindowComponent
     },

     {
        path: 'video',
        component: VideoChatComponent
      },
      {

       path:'audio',
       component:AudioChatComponent
     },
      
      // {
      //   path: 'onlinepeerlearning/:id',
      //   component: DisplayComponent
      // },
    /*  {
      path:'',redirectTo:'/onlinepeerlearning',pathMatch:'full'
    }*/

     {
        path: 'addquestion',
        component: NewpostComponent
      },
        {
        path: 'questiondetail',
        component: DetailpostComponent
      },
     {
        path: 'webeditor',
        component: WebeditorComponent
      },
       {
        path: 'profile',
        component: ProfileComponent
      } ,     
     {
      path:'auth/:userId/:token',
      component: AuthenticateComponent
    }
    ,     
     {
      path:'**',
      component: HomeComponent
    }
   ],  { useHash: true })
  ],
  providers: [LoginService,GitService,EditorService,ChatService, ForumService,AuthenticationService,ProfileService],

  bootstrap: [AppComponent]
})

export class AppModule {}
