import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigpromoComponent } from './bigpromo.component';

describe('BigpromoComponent', () => {
  let component: BigpromoComponent;
  let fixture: ComponentFixture<BigpromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigpromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
