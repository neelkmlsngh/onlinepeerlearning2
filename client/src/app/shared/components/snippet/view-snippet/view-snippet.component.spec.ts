import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSnippetComponent } from './view-snippet.component';

describe('ViewSnippetComponent', () => {
  let component: ViewSnippetComponent;
  let fixture: ComponentFixture<ViewSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
