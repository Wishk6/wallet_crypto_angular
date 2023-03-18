export class WalletModel {
  investment_amount: number;
  cryptocurrency_amount: number;
  name?: string;
  id?: number;

  constructor(
    investment_amount: number,
    cryptocurrency_amount: number,
    name?: string,
    id?: number,
  ) {
    this.investment_amount = investment_amount;
    this.cryptocurrency_amount = cryptocurrency_amount;
    this.name = name;
    this.id = id;
  }
}


