import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualBoardComponent } from './individual-board.component';

describe('IndividualBoardComponent', () => {
  let component: IndividualBoardComponent;
  let fixture: ComponentFixture<IndividualBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
