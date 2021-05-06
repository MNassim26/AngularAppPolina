import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDSComponent } from './gestion-ds.component';

describe('GestionDSComponent', () => {
  let component: GestionDSComponent;
  let fixture: ComponentFixture<GestionDSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
