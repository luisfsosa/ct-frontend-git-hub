import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalClientComponent } from './institutional-client.component';

describe('InstitutionalClientComponent', () => {
  let component: InstitutionalClientComponent;
  let fixture: ComponentFixture<InstitutionalClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionalClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionalClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
