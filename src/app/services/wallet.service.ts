import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject,map,Observable,shareReplay,tap} from "rxjs";
import {WalletTableDataModel} from "../Models/walletTableData.model";
import {IWalletModel} from "../Models/wallet.model";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  walletData$: BehaviorSubject<WalletTableDataModel[]> = new BehaviorSubject<WalletTableDataModel[]>([]);
  private dataFetched = false;

  constructor(private http: HttpClient) {
  }

  get walletData() {
    return this.walletData$.asObservable();
  }

  /**
   * Update crypto data from API to keep it up to date
   */
  updateCrypto() {
    return this.http.patch<any>(environment.api_url + `cryptodata`,{})
  }

  getWallets(reset: boolean = false): Observable<WalletTableDataModel[]> {
    if (!this.dataFetched || reset) {
      this.http.get<any>(environment.api_url + 'wallet')
        .pipe(
          map(data => {
            return data.map((WalletItem: WalletTableDataModel) => {
              return new WalletTableDataModel(WalletItem.id,WalletItem.isFavorite,WalletItem.cryptocurrency_amount,WalletItem.investment_amount,WalletItem.CryptoDataModel);
            });
          }),
          tap(wallets => {
            this.walletData$.next(wallets);
            this.dataFetched = true;
          }),
        )
        .subscribe();
    } else {
    }

    return this.walletData$.asObservable().pipe(shareReplay(1));
  }

  createWallet(wallet: IWalletModel) {
    return this.http.post<any>(environment.api_url + `wallet`,wallet)
      .pipe(
        // ajouter le nouveau wallet dans le tableau des wallets
        tap((wallet: WalletTableDataModel) => {
          const updatedWallets = this.walletData$.getValue();
          updatedWallets.unshift(wallet);
          // trier les valeurs du tableau par valeur de rang
          updatedWallets.sort((a : WalletTableDataModel, b : WalletTableDataModel) => (a.CryptoDataModel.rank > b.CryptoDataModel.rank) ? 1 : -1);
          this.walletData$.next(updatedWallets);
        })
      )

  }

  updateWallet(id: number,body: any) {

    return this.http.patch<any>(environment.api_url + `wallet` + `/${id}`,body)
      .pipe(
        tap(() => {
            const updatedWallets = this.walletData$.getValue();
            const walletIndex = updatedWallets.findIndex((wallet: WalletTableDataModel) => +wallet.id === id);
            updatedWallets[walletIndex] = {
              ...updatedWallets[walletIndex],
              ...body
            };
            this.walletData$.next(updatedWallets);
          }
        ))
  }

  deleteWallet(id: number) {
    return this.http.delete<any>(environment.api_url + `wallet` + `/${id}`)
      .pipe(
        tap(() => {
            const updatedWallets = this.walletData$.getValue().filter((wallet: WalletTableDataModel) => +wallet.id !== id);
            this.walletData$.next(updatedWallets);
          }
        ))
  }

}
