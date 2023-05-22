import {Component,Input,OnDestroy,OnInit} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {Subscription} from "rxjs";
import {WalletTableDataModel} from "../../../Models/walletTableData.model";

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit, OnDestroy{

  totalGain: number = 0;
  totalInvest: number = 0;
  walletSubscription: Subscription = new Subscription();
  walletData: WalletTableDataModel[] = [];
  constructor(private walletService: WalletService) {
  }

  ngOnInit(): void {
    this.walletSubscription = this.walletService.getWallets().subscribe(wallets => {
      this.walletData = wallets;
      this.setTotalGain();
      this.setTotalInvest();
    });
  }

  ngOnDestroy(): void {
    if (this.walletSubscription)
    this.walletSubscription.unsubscribe();
  }

  setTotalGain() {
    console.log(this.walletData);
    this.totalGain = Math.ceil(this.walletData.map((wallet: WalletTableDataModel) => {
      // faire un calcul pour chaque wallet
      return +wallet.CryptoDataModel.price * wallet.cryptocurrency_amount - wallet.investment_amount
    }).reduce((acc: any,value: any) => acc + value,0));
  }

  setTotalInvest() {
    this.totalInvest = Math.ceil(this.walletData.map((wallet: WalletTableDataModel) => {
      return wallet.investment_amount;
    }).reduce((acc: any,value: any) => acc + value,0));

  }

}


