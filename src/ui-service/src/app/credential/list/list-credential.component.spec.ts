import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCredentialComponent } from './list-credential.component';

describe('ListCredentialComponent', () => {
  let component: ListCredentialComponent;
  let fixture: ComponentFixture<ListCredentialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCredentialComponent]
    });
    fixture = TestBed.createComponent(ListCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
