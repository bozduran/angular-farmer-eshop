import { TestBed } from '@angular/core/testing';

import { FarmerShopFormService } from './farmer-shop-form.service';

describe('FarmerShopFormService', () => {
  let service: FarmerShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
