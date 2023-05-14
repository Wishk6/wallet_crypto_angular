import {Component,OnInit} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {WalletTableDataModel} from "../../../Models/walletTableData.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private walletService: WalletService,private toastService: ToastrService) {
  }

  walletArr: WalletTableDataModel[] = [];

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.walletService.getFavoriteWallets().subscribe(
      {
        next: (data) => {
          // remove undefined valuez
          this.walletArr = data.filter((item) => {
            return item !== undefined;
          });
        },
        error: (err) => {
          console.log(err);
          this.toastService.error(err,'Error gettting favorites');
        }
      });
  }

}
