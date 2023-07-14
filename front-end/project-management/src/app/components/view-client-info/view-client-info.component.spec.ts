import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientInfoComponent } from './view-client-info.component';

describe('ViewClientInfoComponent', () => {
  let component: ViewClientInfoComponent;
  let fixture: ComponentFixture<ViewClientInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClientInfoComponent]
    });
    fixture = TestBed.createComponent(ViewClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
