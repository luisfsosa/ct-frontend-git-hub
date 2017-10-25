import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryClientComponent } from './beneficiary-client.component';

describe('BeneficiaryClientComponent', () => {
  let component: BeneficiaryClientComponent;
  let fixture: ComponentFixture<BeneficiaryClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
