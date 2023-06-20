import {Component,OnDestroy,OnInit} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit,OnDestroy {

  favoritesArraySubscription: Subscription = new Subscription();
  favoritesArray: any[] = [];
  actualTheme: string = localStorage.getItem('dark-theme') === 'true' ? 'dark' : 'light';
  constructor(private walletService: WalletService) {
  }

  ngOnInit(): void {
    this.favoritesArraySubscription = this.walletService.getWallets(true).subscribe(wallets => {
      this.favoritesArray = wallets.filter(wallet => wallet.isFavorite);
    });
  }

  ngOnDestroy(): void {
    if (this.favoritesArraySubscription)
      this.favoritesArraySubscription.unsubscribe();
  }

}
