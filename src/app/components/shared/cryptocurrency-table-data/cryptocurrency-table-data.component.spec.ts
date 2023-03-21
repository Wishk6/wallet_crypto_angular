import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyTableDataComponent } from './cryptocurrency-table-data.component';

describe('CryptocurrencyTableDataComponent', () => {
  let component: CryptocurrencyTableDataComponent;
  let fixture: ComponentFixture<CryptocurrencyTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptocurrencyTableDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptocurrencyTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
