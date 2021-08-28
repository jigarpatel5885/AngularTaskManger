import { TestBed } from '@angular/core/testing';

import { JwtUnuthorizedInterceptorService } from './jwt-unuthorized-interceptor.service';

describe('JwtUnuthorizedInterceptorService', () => {
  let service: JwtUnuthorizedInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtUnuthorizedInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
