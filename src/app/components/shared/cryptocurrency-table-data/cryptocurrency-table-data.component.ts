import {Component,EventEmitter,Input,Output} from '@angular/core';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import {DecimalPipe,NgIf} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {GenericActionButtonComponent} from "../Generics/generic-action-button/generic-action-button.component";
import {
  GenericValueColorationComponent
} from "../Generics/generic-pourcentage-widget/generic-value-coloration.component";

@Component({
  selector: 'app-cryptocurrency-table-data',
  templateUrl: './cryptocurrency-table-data.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
    MatToolbarModule,
    DecimalPipe,
    GenericActionButtonComponent,
    GenericValueColorationComponent
  ],
  styleUrls: ['./cryptocurrency-table-data.component.scss']
})
export class CryptocurrencyTableDataComponent {
  displayedColumns: string[] = ['image','rang','nom','prix','24h','solde','investDollars','prixAchat','gain','action'];
  @Input() totalGain: number = 0;
  @Input() totalInvest: number = 0;

  @Input() dataArray: MatTableDataSource<{
    isFavorite: boolean;
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

  @Output() actionButtonEvent: EventEmitter<{ action: string,value: number }> = new EventEmitter<{
    action: string,
    value: number
  }>();

  ngOnDestroy(): void {
    this.dataArray.disconnect();
  }

  actionButton(action: string,indexSelected: number,optionData: any = null) {
    const event = {
      action: action,value: indexSelected,
      optionData: optionData !== null ? optionData : null
    };
    this.actionButtonEvent.emit(event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataArray.filter = filterValue.trim().toLowerCase();
  }

}
