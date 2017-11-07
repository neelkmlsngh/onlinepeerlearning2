import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebeditorComponent } from './webeditor.component';
import { AceEditorDirective } from 'ng2-ace-editor'
import { AceEditorModule } from 'ng2-ace-editor'
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { SnippetService} from '../../services/snippet.service';
import { webEditorConfig } from '../../config/webEditor.config';

describe('Settings component Testing', () => {
 /*config= webEditorConfig;*/
 let comp: WebeditorComponent;
 let fixture: ComponentFixture < WebeditorComponent > ;

 let button1de:  DebugElement;
 let button1el:  HTMLElement;
 

beforeEach(async() => {

  TestBed.configureTestingModule({
     imports: [RouterTestingModule,
     HttpModule,AceEditorModule,
     FormsModule, ReactiveFormsModule],
     declarations: [WebeditorComponent],
   schemas:      [ NO_ERRORS_SCHEMA ],
    //declaring component to be tested
    providers: [SnippetService]
   }).compileComponents();
 })
/*Initial configuration that will run before every testcase*/
 beforeEach(() => {
   fixture = TestBed.createComponent(WebeditorComponent);
   comp = fixture.componentInstance;

   button1de = fixture.debugElement.query(By.css('.output'));
   button1el = button1de.nativeElement;

   
})

/*Testcase to check whether component is created or not*/
 it('should create webeditor component', () => {
   comp = fixture.debugElement.componentInstance;
   expect(comp).toBeTruthy();
 });

 it('it should display output', () => {
   fixture.detectChanges();
   expect(button1el.textContent).toContain(webEditorConfig.webEditor.OUTPUT);
 });


})