import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCredentialComponent } from './manage-credential.component';

describe('ManageCredentialComponent', () => {
  let component: ManageCredentialComponent;
  let fixture: ComponentFixture<ManageCredentialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCredentialComponent]
    });
    fixture = TestBed.createComponent(ManageCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
