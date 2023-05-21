import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent {
  cryptoData: MatTableDataSource<{
    favorite: boolean,
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
  totalGain: number = 0;
  totalInvest: number = 0;

  ngOnInit(): void {
    // this.getData();
  }

  setTotalGain() {
    this.totalGain = Math.ceil(this.cryptoData.data.map((wallet: any) => wallet.gain).reduce((acc: any,value: any) => acc + value,0));
  }

  setTotalInvest() {
    this.totalInvest = this.cryptoData.data.map((wallet: any) =>
      wallet.investInDollars).reduce((acc: any,value: any) => acc + value,0);
  }

}


