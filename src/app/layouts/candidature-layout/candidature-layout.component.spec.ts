import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureLayoutComponent } from './candidature-layout.component';

describe('CandidatureLayoutComponent', () => {
  let component: CandidatureLayoutComponent;
  let fixture: ComponentFixture<CandidatureLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatureLayoutComponent]
    });
    fixture = TestBed.createComponent(CandidatureLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
