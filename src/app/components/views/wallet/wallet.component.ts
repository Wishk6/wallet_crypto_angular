import {Component,OnInit} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  cryptoData: MatTableDataSource<{
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

  lastUpdate: string = '';
  totalGain: number = 0;
  totalInvest: number = 0;

  constructor(private walletService: WalletService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.walletService.getWallets().subscribe(
      (data) => {
        if (data.length !== 0) {
          this.lastUpdate = new Date(data[0].CryptoDataModel.last_update).toLocaleString();

          this.cryptoData.data = data.map((item) => {
            return {
              image: item.CryptoDataModel.image,
              id: item.id,
              Rang: item.CryptoDataModel.rank,
              name: item.CryptoDataModel.name,
              price: item.CryptoDataModel.price,
              priceChange: item.CryptoDataModel.price_change_24,
              amount: item.cryptocurrency_amount,
              investInDollars: item.investment_amount,
              boughtPrice: item.investment_amount / item.cryptocurrency_amount,
              gain: +item.CryptoDataModel.price * item.cryptocurrency_amount - item.investment_amount
            }
          })
          this.setTotalGain();
          this.setTotalInvest();
        } else {
          this.cryptoData.data = [];
        }
      })
  }

  setTotalGain() {
    this.totalGain = Math.ceil(this.cryptoData.data.map((wallet: any) => wallet.gain).reduce((acc: any,value: any) => acc + value,0));
  }

  setTotalInvest() {
    this.totalInvest = this.cryptoData.data.map((wallet: any) =>
      wallet.investInDollars).reduce((acc: any,value: any) => acc + value,0);
  }

  deleteWallet(id: string) {
    this.walletService.deleteWallet(+id).subscribe(
      (data) => {
        // mettre un message de success
        this.getData();
      }
    )
  }

  actions(event: any) {
    if (event.action === 'delete') {
      this.deleteWallet(this.cryptoData.data[event.value].id);
    } else if (event.action === 'edit') {
    }
  }

}
