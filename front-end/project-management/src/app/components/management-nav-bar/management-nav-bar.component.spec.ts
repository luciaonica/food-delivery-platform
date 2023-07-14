import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementNavBarComponent } from './management-nav-bar.component';

describe('ManagementNavBarComponent', () => {
  let component: ManagementNavBarComponent;
  let fixture: ComponentFixture<ManagementNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementNavBarComponent]
    });
    fixture = TestBed.createComponent(ManagementNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
