import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map,Observable} from "rxjs";
import {WalletModel} from "../Models/wallet.model";
import {WalletTableDataModel} from "../Models/walletTableData.model";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) {
  }


  getWallets(): Observable<[WalletTableDataModel]> {
    return this.http.get<any>(environment.api_url + `wallet/all`)
      .pipe(map(data => {
          return data.map((WalletItem: WalletTableDataModel) => {
            console.log(WalletItem)
            return new WalletTableDataModel(WalletItem.id,WalletItem.cryptocurrency_amount,WalletItem.investment_amount,WalletItem.CryptoDataModel);
          })
        }
      ))
  }

  createWallet(wallet: WalletModel) {
    return this.http.post<any>(environment.api_url + `wallet`,wallet)
      .pipe(map(data => {
          console.log(data);
        })
      );
  }

  updateWallet(cryptocurrency_amount: number,investment_amount: number) {
    return this.http.post<any>(environment.api_url + `wallet`,{
      cryptocurrency_amount: cryptocurrency_amount,
      investment_amount: investment_amount
    })
      .pipe(map(data => {
          console.log(data);
        })
      );
  }

  deleteWallet() {

  }

}
