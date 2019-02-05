import { TestBed } from '@angular/core/testing';

import { ImagestorageService } from './imagestorage.service';

describe('ImagestorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagestorageService = TestBed.get(ImagestorageService);
    expect(service).toBeTruthy();
  });
});
