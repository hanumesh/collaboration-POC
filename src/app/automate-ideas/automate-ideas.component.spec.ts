import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomateIdeasComponent } from './automate-ideas.component';

describe('AutomateIdeasComponent', () => {
  let component: AutomateIdeasComponent;
  let fixture: ComponentFixture<AutomateIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomateIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomateIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
