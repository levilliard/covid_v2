import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCrudComponent } from './covid-crud.component';

describe('CovidCrudComponent', () => {
  let component: CovidCrudComponent;
  let fixture: ComponentFixture<CovidCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
