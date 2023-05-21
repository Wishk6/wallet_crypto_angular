import {CryptoCurrencyModel} from "./cryptocurrency.model";

export class WalletTableDataModel {
  id: string;
  isFavorite: boolean;
  cryptocurrency_amount: number;
  investment_amount: number;
  CryptoDataModel: CryptoCurrencyModel;

  constructor(
    id: string,
    isFavorite: boolean,
    cryptocurrency_amount: number,
    investment_amount: number,
    CryptoDataModel: CryptoCurrencyModel,
  ) {
    this.id = id;
    this.isFavorite = isFavorite;
    this.cryptocurrency_amount = cryptocurrency_amount;
    this.investment_amount = investment_amount;
    this.CryptoDataModel = CryptoDataModel;
  }
}


