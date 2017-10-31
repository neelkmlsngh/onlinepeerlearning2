import { TestBed, inject } from '@angular/core/testing';

import { CoderunnerService } from './coderunner.service';

describe('CoderunnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoderunnerService]
    });
  });

  it('should be created', inject([CoderunnerService], (service: CoderunnerService) => {
    expect(service).toBeTruthy();
  }));
});
