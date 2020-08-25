import { TestBed } from '@angular/core/testing';

import { SaverdataService } from './saverdata.service';

describe('SaverdataService', () => {
  let service: SaverdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaverdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
