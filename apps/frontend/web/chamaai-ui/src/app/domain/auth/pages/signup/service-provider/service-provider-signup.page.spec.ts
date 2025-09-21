import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderSignupPage } from './service-provider-signup.page';

describe('ServiceProviderSignupPage', () => {
  let component: ServiceProviderSignupPage;
  let fixture: ComponentFixture<ServiceProviderSignupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderSignupPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
