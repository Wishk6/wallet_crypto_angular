export class CryptoCurrencyModel {
  apiId: number;
  image: string;
  name: string;
  price: string;
  price_change_24: string;
  rank: string;
  symbol: string;

  last_update: string;

  constructor(
    apiId: number,
    image: string,
    name: string,
    price: string,
    price_change_24: string,
    rank: string,
    symbol: string,
    last_update: string
  ) {
    this.apiId = apiId;
    this.image = image;
    this.name = name;
    this.price = price;
    this.price_change_24 = price_change_24;
    this.rank = rank;
    this.symbol = symbol;
    this.last_update = last_update;
  }
}


