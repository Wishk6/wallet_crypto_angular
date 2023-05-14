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

  updateCrypto() {
    return this.http.patch<any>(environment.api_url + `cryptodata`,{})
      .pipe(map(response => {
          return response;
        })
      );
  }

  getWallets(): Observable<WalletTableDataModel[]> {
// TODO : Mettre en cache la data du get
    // shareReplay(1)
    return this.http.get<any>(environment.api_url + `wallet`)
      .pipe(map(data => {
          return data.map((WalletItem: WalletTableDataModel) => {
            return new WalletTableDataModel(WalletItem.id,WalletItem.cryptocurrency_amount,WalletItem.investment_amount,WalletItem.CryptoDataModel);
          })
        }
      ))
  }

  getFavoriteWallets(): Observable<WalletTableDataModel[]> {
// TODO : Mettre en cache la data du get
    // shareReplay(1)
    return this.http.get<any>(environment.api_url + `wallet`)
      .pipe(map(data => {
        return data.map((WalletItem: WalletTableDataModel) => {

          if (localStorage.getItem('favorites')?.includes(WalletItem.CryptoDataModel.name)) {
            return new WalletTableDataModel(WalletItem.id,WalletItem.cryptocurrency_amount,WalletItem.investment_amount,WalletItem.CryptoDataModel);
          } else {
            return;
          }

        })
      }))
  }

  createWallet(wallet: WalletModel) {
    return this.http.post<any>(environment.api_url + `wallet`,wallet)
      .pipe(map(data => {
          if (data) {
            console.log(data);
          }
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

  deleteWallet(id: number) {
    return this.http.delete<any>(environment.api_url + `wallet` + `/${id}`)
      .pipe(map(data => {
          console.log(data);
        })
      );
  }

}
