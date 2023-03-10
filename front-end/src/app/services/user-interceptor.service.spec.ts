import { TestBed } from '@angular/core/testing';

import { UserInterceptorService } from './user-interceptor.service';

describe('UserInterceptorService', () => {
  let service: UserInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
