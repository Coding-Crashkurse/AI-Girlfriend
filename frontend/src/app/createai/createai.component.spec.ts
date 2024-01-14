import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateaiComponent } from './createai.component';

describe('CreateaiComponent', () => {
  let component: CreateaiComponent;
  let fixture: ComponentFixture<CreateaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
