import { TestBed } from '@angular/core/testing';

import { FirewallService } from './firewall.service';

describe('FirewallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirewallService = TestBed.get(FirewallService);
    expect(service).toBeTruthy();
  });
});
