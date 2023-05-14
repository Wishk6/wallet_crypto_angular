import {Component,EventEmitter,Input,Output} from '@angular/core';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {DecimalPipe,NgIf} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-cryptocurrency-table-data',
  templateUrl: './cryptocurrency-table-data.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatTableModule,
    MatIconModule,
    NgIf,
    MatToolbarModule,
    DecimalPipe
  ],
  styleUrls: ['./cryptocurrency-table-data.component.scss']
})
export class CryptocurrencyTableDataComponent {
  displayedColumns: string[] = ['image','rang','nom','prix','24h','solde','investDollars','prixAchat','gain','action'];
  @Input() totalGain: number = 0;
  @Input() totalInvest: number = 0;

  @Input() dataArray: MatTableDataSource<{
    favorite: boolean;
    image: string;
    id: string;
    Rang: string;
    name: string;
    price: string;
    priceChange: string;
    amount: number;
    investInDollars: number;
    boughtPrice: number;
    gain: number;
  }> = new MatTableDataSource();

  @Output() actionButtonEvent: EventEmitter<{ action: string,value: number }> = new EventEmitter<{ action: string,value: number }>();

  constructor() {
  }

  ngOnDestroy(): void {
    this.dataArray.disconnect();
  }
  actionButton(action : string,indexSelected: number) {
    this.actionButtonEvent.emit({action: action,value: indexSelected});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataArray.filter = filterValue.trim().toLowerCase();
  }

}
