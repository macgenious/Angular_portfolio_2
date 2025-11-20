import { TestBed } from '@angular/core/testing';

import { Particles } from './particles';

describe('Particles', () => {
  let service: Particles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Particles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
