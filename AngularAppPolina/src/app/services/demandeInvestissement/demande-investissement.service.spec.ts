import { TestBed } from '@angular/core/testing';

import { DemandeInvestissementService } from './demande-investissement.service';

describe('DemandeInvestissementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandeInvestissementService = TestBed.get(DemandeInvestissementService);
    expect(service).toBeTruthy();
  });
});
