import { TestBed } from '@angular/core/testing';

import { AlreadyAuthenticatedService } from './already-authenticated.service';

describe('AlreadyAuthenticatedService', () => {
  let service: AlreadyAuthenticatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlreadyAuthenticatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
