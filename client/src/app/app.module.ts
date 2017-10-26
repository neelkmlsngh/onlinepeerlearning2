import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
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
import { DisplayComponent } from './display/display.component';

import {LoginService} from './home/service/login.service'

import { WebeditorComponent } from './shared/components/webeditor/webeditor.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    NavbarComponent,
    RepoSidebarComponent,
    ChatSidebarComponent,
    FooterComponent,
    DisplayComponent,
    WebeditorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AceEditorModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([

      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'onlinepeerlearning',
        component: DisplayComponent
      },
      {
        path: 'onlineUsers',
        component: ChatSidebarComponent
      },
      {
        path: '',
        component: DisplayComponent
      },
      {
        path: 'webeditor',
        component: WebeditorComponent
      }

      // {
      //   path: 'onlinepeerlearning/:id',
      //   component: DisplayComponent
      // },
      /*  {
        path:'',redirectTo:'/onlinepeerlearning',pathMatch:'full'
      }*/
    ], { useHash: true })
  ],

  providers: [LoginService,GitService,EditorService,ChatService],

  bootstrap: [AppComponent]
})
export class AppModule {}
