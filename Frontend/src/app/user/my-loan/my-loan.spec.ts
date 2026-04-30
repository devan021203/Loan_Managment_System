import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoan } from './my-loan';

describe('MyLoan', () => {
  let component: MyLoan;
  let fixture: ComponentFixture<MyLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLoan],
    }).compileComponents();

    fixture = TestBed.createComponent(MyLoan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
