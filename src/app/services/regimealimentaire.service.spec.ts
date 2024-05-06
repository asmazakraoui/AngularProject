import { TestBed } from '@angular/core/testing';

import { RegimealimentaireService } from './regimealimentaire.service';

describe('RegimealimentaireService', () => {
  let service: RegimealimentaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegimealimentaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
