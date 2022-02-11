import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrowWindowComponent } from './narrow-window.component';

describe('NarrowWindowComponent', () => {
  let component: NarrowWindowComponent;
  let fixture: ComponentFixture<NarrowWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarrowWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrowWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
