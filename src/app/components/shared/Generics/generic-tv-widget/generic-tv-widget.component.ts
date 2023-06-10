import {AfterViewInit,Component,ElementRef,Input,Renderer2,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-generic-tv-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-tv-widget.component.html',
  styleUrls: ['./generic-tv-widget.component.scss']
})

export class GenericTvWidget implements AfterViewInit {
  @ViewChild('tradingview') tradingview?: ElementRef;
  @Input() scriptSrc: string = '';
  @Input() scriptTextObject: {} = {};

  constructor(private _renderer2: Renderer2) {
  }

  ngAfterViewInit(): void {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.src = this.scriptSrc;
    script.text = JSON.stringify(this.scriptTextObject);
    this.tradingview?.nativeElement.appendChild(script);
  }
}
