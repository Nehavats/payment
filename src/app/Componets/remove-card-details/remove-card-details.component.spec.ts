import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCardDetailsComponent } from './remove-card-details.component';

describe('RemoveCardDetailsComponent', () => {
  let component: RemoveCardDetailsComponent;
  let fixture: ComponentFixture<RemoveCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
