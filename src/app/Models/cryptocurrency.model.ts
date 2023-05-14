export class CryptoCurrencyModel {
  apiId: number;
  image: string;
  name: string;
  price: string;
  price_change_24_percentage: string;
  rank: string;
  symbol: string;

  last_update: string;

  constructor(
    apiId: number,
    image: string,
    name: string,
    price: string,
    price_change_24_percentage: string,
    rank: string,
    symbol: string,
    last_update: string
  ) {
    this.apiId = apiId;
    this.image = image;
    this.name = name;
    this.price = price;
    this.price_change_24_percentage = price_change_24_percentage;
    this.rank = rank;
    this.symbol = symbol;
    this.last_update = last_update;
  }
}


