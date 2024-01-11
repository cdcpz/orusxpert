import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationCrudComponent } from './station-crud.component';

describe('StationCrudComponent', () => {
  let component: StationCrudComponent;
  let fixture: ComponentFixture<StationCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationCrudComponent]
    });
    fixture = TestBed.createComponent(StationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
