import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCryptocurrencyComponentComponent } from './add-cryptocurrency-component.component';

describe('AddCryptocurrencyComponentComponent', () => {
  let component: AddCryptocurrencyComponentComponent;
  let fixture: ComponentFixture<AddCryptocurrencyComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCryptocurrencyComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCryptocurrencyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
