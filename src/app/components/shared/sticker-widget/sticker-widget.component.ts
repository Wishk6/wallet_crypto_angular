import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

declare const TradingView: any;

@Component({
  selector: 'app-sticker-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sticker-widget.component.html',
  styleUrls: ['./sticker-widget.component.scss']
})
export class StickerWidgetComponent {
  data: any = {
    "symbols": [
      {
        "proName": "FOREXCOM:SPXUSD",
        "title": "S&P 500"
      },
      {
        "proName": "FOREXCOM:NSXUSD",
        "title": "US 100"
      },
      {
        "proName": "FX_IDC:EURUSD",
        "title": "EUR/USD"
      },
      {
        "proName": "BITSTAMP:BTCUSD",
        "title": "Bitcoin"
      },
      {
        "proName": "BITSTAMP:ETHUSD",
        "title": "Ethereum"
      }
    ],
    "colorTheme": "dark",
    "isTransparent": false,
    "showSymbolLogo": true,
    "locale": "fr"
  };

}
