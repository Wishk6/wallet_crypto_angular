import {ComponentFixture,TestBed} from '@angular/core/testing';

import {GenericValueColorationComponent} from './generic-value-coloration.component';

describe('GenericPourcentageWidgetComponent',() => {
  let component: GenericValueColorationComponent;
  let fixture: ComponentFixture<GenericValueColorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericValueColorationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenericValueColorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',() => {
    expect(component).toBeTruthy();
  });
});
