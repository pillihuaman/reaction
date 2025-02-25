import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServPillihuamanSidebarHomeComponent } from './serv-pillihuaman-sidebar-home.component';

describe('ServPillihuamanSidebarHomeComponent', () => {
  let component: ServPillihuamanSidebarHomeComponent;
  let fixture: ComponentFixture<ServPillihuamanSidebarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServPillihuamanSidebarHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServPillihuamanSidebarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
