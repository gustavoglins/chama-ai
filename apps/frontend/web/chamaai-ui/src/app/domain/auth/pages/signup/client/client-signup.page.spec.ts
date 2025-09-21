import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSignupPage } from './client-signup.page';

describe('ClientSignupPage', () => {
  let component: ClientSignupPage;
  let fixture: ComponentFixture<ClientSignupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSignupPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
