import { TestBed, inject } from '@angular/core/testing';

import { SecureStorageService } from './secure-storage.service';

describe('SecureStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureStorageService]
    });
  });

  it('should be created', inject([SecureStorageService], (service: SecureStorageService) => {
    expect(service).toBeTruthy();
  }));
});
