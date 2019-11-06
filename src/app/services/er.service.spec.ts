import { TestBed, inject } from '@angular/core/testing';

import { ErService } from './er.service';

describe('ErService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErService]
    });
  });

  it('should be created', inject([ErService], (service: ErService) => {
    expect(service).toBeTruthy();
  }));
});
