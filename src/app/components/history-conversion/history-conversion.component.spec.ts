import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryConversionComponent } from './history-conversion.component';

describe('HistoryConversionComponent', () => {
  let component: HistoryConversionComponent;
  let fixture: ComponentFixture<HistoryConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryConversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
