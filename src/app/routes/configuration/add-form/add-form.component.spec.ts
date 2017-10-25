import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfcFormComponent } from './rfc-form.component';

describe('RfcFormComponent', () => {
  let component: RfcFormComponent;
  let fixture: ComponentFixture<RfcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
