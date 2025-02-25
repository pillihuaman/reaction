import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServPillihuamanFooterHomeComponent } from './app-serv-pillihuaman-footer-home.component';

describe('AppServPillihuamanFooterHomeComponent', () => {
  let component: AppServPillihuamanFooterHomeComponent;
  let fixture: ComponentFixture<AppServPillihuamanFooterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppServPillihuamanFooterHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppServPillihuamanFooterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
