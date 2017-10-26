import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';

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
import { MainComponent } from './main/main.component';
import { ForumComponent } from './shared/components/forum/forum.component';
import { ViewpostComponent } from './shared/components/forum/viewpost/viewpost.component';
import { DetailpostComponent } from './shared/components/forum/detailpost/detailpost.component';
import { NewpostComponent } from './shared/components/forum/newpost/newpost.component';
import {  ForumService } from './shared/services/forum.service';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    NavbarComponent,
    RepoSidebarComponent,
    ChatSidebarComponent,
    FooterComponent,
    MainComponent,
    ViewpostComponent,
    DetailpostComponent,
    NewpostComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
     HttpModule,
    FormsModule,
    CKEditorModule,
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
        path: 'addquestion',
        component: NewpostComponent
      },
        {
        path: 'questiondetail',
        component: DetailpostComponent
      },
      {
       path:'',
       component:MainComponent
     },
     
  /*        {
      path:'',redirectTo:'/home',pathMatch:'full'
    },*/
     
     {
      path:'**',
      component: HomeComponent
    }

   ],  { useHash: true })
  ],
  providers: [GitService,EditorService,ChatService, ForumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
