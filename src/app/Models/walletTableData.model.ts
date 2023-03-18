import {CryptoCurrencyModel} from "./cryptocurrency.model";

export class WalletTableDataModel {
  id: string;
  cryptocurrency_amount: number;
  investment_amount: number;
  CryptoDataModel: CryptoCurrencyModel;

  constructor(
    id: string,
    cryptocurrency_amount: number,
    investment_amount: number,
    CryptoDataModel: CryptoCurrencyModel,
  ) {
    this.id = id;
    this.cryptocurrency_amount = cryptocurrency_amount;
    this.investment_amount = investment_amount;
    this.CryptoDataModel = CryptoDataModel;
  }
}


