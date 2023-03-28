import {Component,EventEmitter,Input,Output} from '@angular/core';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cryptocurrency-table-data',
  templateUrl: './cryptocurrency-table-data.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatTableModule,
    MatIconModule,
    NgIf
  ],
  styleUrls: ['./cryptocurrency-table-data.component.scss']
})
export class CryptocurrencyTableDataComponent {
  displayedColumns: string[] = ['image','rang','nom','prix','24h','solde','investDollars','prixAchat','gain','action'];
  @Input() totalGain: number = 0;
  @Input() totalInvest: number = 0;

  @Input() dataArray: MatTableDataSource<{
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

  actionButton(action : string,indexSelected: number) {
    this.actionButtonEvent.emit({action: action,value: indexSelected});
    this.actionButtonEvent = new EventEmitter<{ action: string,value: number }>();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataArray.filter = filterValue.trim().toLowerCase();
  }

}
