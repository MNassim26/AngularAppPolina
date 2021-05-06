import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDIComponent } from './gestion-di.component';

describe('GestionDIComponent', () => {
  let component: GestionDIComponent;
  let fixture: ComponentFixture<GestionDIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
