import {Component,OnDestroy,OnInit} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {WalletTableDataModel} from "../../../Models/walletTableData.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private walletService: WalletService,private toastService: ToastrService) {
  }

  favoritesArray: WalletTableDataModel[] = [];

  ngOnInit(): void {
    this.walletService.getWallets().subscribe(wallets => {
      this.favoritesArray = wallets.filter(wallet => wallet.isFavorite);
    });
  }

  ngOnDestroy(): void {

  }

}
