import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavedCardListComponent } from './view-saved-card-list.component';

describe('ViewSavedCardListComponent', () => {
  let component: ViewSavedCardListComponent;
  let fixture: ComponentFixture<ViewSavedCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSavedCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSavedCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
