import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserRhComponent } from './list-user-rh.component';

describe('ListUserRhComponent', () => {
  let component: ListUserRhComponent;
  let fixture: ComponentFixture<ListUserRhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUserRhComponent]
    });
    fixture = TestBed.createComponent(ListUserRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
