import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserRhComponent } from './add-user-rh.component';

describe('AddUserRhComponent', () => {
  let component: AddUserRhComponent;
  let fixture: ComponentFixture<AddUserRhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserRhComponent]
    });
    fixture = TestBed.createComponent(AddUserRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
