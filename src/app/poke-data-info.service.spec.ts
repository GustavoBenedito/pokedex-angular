import { TestBed } from '@angular/core/testing';

import { PokeDataInfoService } from './poke-data-info.service';

describe('PokeDataInfoService', () => {
  let service: PokeDataInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeDataInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
