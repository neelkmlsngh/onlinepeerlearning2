import { async, ComponentFixture, TestBed } from '@angular/core/testing';
/*import { RouterTesingModule } from '@angular/router/testing';*/
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewpostComponent } from './newpost.component';
import { ForumService } from '../../../services/forum.service';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor';

describe('NewpostComponent', () => {
  let component: NewpostComponent;
  let fixture: ComponentFixture<NewpostComponent>;/*
  let de:      DebugElement;
  let el:      HTMLElement;*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       HttpModule,
       FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        CKEditorModule

      ],
      declarations: [ NewpostComponent ],
      providers: [ForumService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpostComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    const forum=fixture.debugElement.componentInstance;
    expect(forum).toBeTruthy();
  });


});
