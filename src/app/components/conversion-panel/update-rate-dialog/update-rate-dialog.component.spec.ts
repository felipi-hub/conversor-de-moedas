import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRateDialogComponent } from './update-rate-dialog.component';

describe('UpdateRateDialogComponent', () => {
  let component: UpdateRateDialogComponent;
  let fixture: ComponentFixture<UpdateRateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
