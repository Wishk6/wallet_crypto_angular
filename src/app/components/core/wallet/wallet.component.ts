import {Component,OnInit} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements  OnInit {

  constructor(private walletService : WalletService) { }

  ngOnInit() {
    this.walletService.getWallets().subscribe(
      data => {
        console.log(data);
      }
    )
  }



}
