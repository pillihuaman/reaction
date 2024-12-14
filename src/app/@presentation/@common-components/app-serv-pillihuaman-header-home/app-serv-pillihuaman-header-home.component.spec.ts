import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServPillihuamanHeaderHomeComponent } from './app-serv-pillihuaman-header-home.component';

describe('AppServPillihuamanHeaderHomeComponent', () => {
  let component: AppServPillihuamanHeaderHomeComponent;
  let fixture: ComponentFixture<AppServPillihuamanHeaderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppServPillihuamanHeaderHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppServPillihuamanHeaderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
