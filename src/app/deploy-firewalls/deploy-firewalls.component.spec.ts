import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployFirewallsComponent } from './deploy-firewalls.component';

describe('DeployFirewallsComponent', () => {
  let component: DeployFirewallsComponent;
  let fixture: ComponentFixture<DeployFirewallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployFirewallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployFirewallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
