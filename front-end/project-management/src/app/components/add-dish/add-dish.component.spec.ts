import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishComponent } from './add-dish.component';

describe('AddDishComponent', () => {
  let component: AddDishComponent;
  let fixture: ComponentFixture<AddDishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDishComponent]
    });
    fixture = TestBed.createComponent(AddDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
