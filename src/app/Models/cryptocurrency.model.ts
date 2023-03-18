export class CryptoCurrencyModel {
  apiId: number;
  image: string;
  name: string;
  price: string;
  price_change_24h: string;
  rank: string;
  symbol: string;

  constructor(
    apiId: number,
    image: string,
    name: string,
    price: string,
    price_change_24h: string,
    rank: string,
    symbol: string,
  ) {
    this.apiId = apiId;
    this.image = image;
    this.name = name;
    this.price = price;
    this.price_change_24h = price_change_24h;
    this.rank = rank;
    this.symbol = symbol;
  }
}


