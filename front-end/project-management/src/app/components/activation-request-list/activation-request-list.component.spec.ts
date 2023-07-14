import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationRequestListComponent } from './activation-request-list.component';

describe('ActivationRequestListComponent', () => {
  let component: ActivationRequestListComponent;
  let fixture: ComponentFixture<ActivationRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationRequestListComponent]
    });
    fixture = TestBed.createComponent(ActivationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
