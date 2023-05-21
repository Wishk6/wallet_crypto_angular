import {Component,OnDestroy,OnInit} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {

  // data source qui fonctionne comme un Observable
  cryptoData: MatTableDataSource<{
    isFavorite: boolean,
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

  constructor( private walletService: WalletService,private toastService: ToastrService) {
  }

  ngOnDestroy(): void {
    this.cryptoData.disconnect();
  }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * Get data from the API and format it
   */
  getData() {
    this.walletService.getWallets().subscribe(
      {
        next: (data) => {
          if (data.length !== 0) {

            this.lastUpdate = new Date(data[0].CryptoDataModel.last_update).toLocaleString();
            this.cryptoData.data = data.map((item) => {
              // mettre l'image en cache
              return {
                isFavorite: item.isFavorite,
                image: item.CryptoDataModel.image,
                id: item.id,
                Rang: item.CryptoDataModel.rank,
                name: item.CryptoDataModel.name,
                price: item.CryptoDataModel.price,
                priceChange: item.CryptoDataModel.price_change_24_percentage,
                amount: item.cryptocurrency_amount,
                investInDollars: item.investment_amount,
                boughtPrice: item.investment_amount / item.cryptocurrency_amount,
                gain: +item.CryptoDataModel.price * item.cryptocurrency_amount - item.investment_amount
              }
            })
          } else {
            this.cryptoData.data = [];
          }
        },
        error: (error) => {
          this.toastService.error('Error while getting data, please try again later');
        }
      })

  }

  deleteWallet(id: string) {
    this.walletService.deleteWallet(+id).subscribe({
        next: () => {
          this.getData();
        },
        error: (error) => {
          this.toastService.error('Erreur lors de la suppression du portefeuille');
        }
      })
  }

  actions(event: any) {

    if (event.action === 'delete') {
      this.deleteWallet(this.cryptoData.data[event.value].id);
    } else if (event.action === 'edit') {
    } else if (event.action === 'favorite') {
      this.walletService.updateWallet(+this.cryptoData.data[event.value].id,({isFavorite: !this.cryptoData.data[event.value].isFavorite})).subscribe({
        next: () => {
          // compare avec la donnée actuelle pour savoir si on ajoute ou retire des favoris
          !this.cryptoData.data[event.value].isFavorite ?
            this.toastService.info('Retiré des favoris') : this.toastService.success('Ajouté aux favoris');
          this.getData();
        },
        error: (error) => {
          this.toastService.error('Erreur lors de la mise à jour du portefeuille');
        }
      })
    } else if (event.action === 'remove favorite') {

    }
  }

}
