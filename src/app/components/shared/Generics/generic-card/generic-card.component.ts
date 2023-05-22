import {Component,Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-generic-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss']
})

export class GenericCardComponent {

  @Input() imageData: { url : string, dominantColor : string } = { url : "", dominantColor : "" };

  constructor() {
  }

  getColor(): { [key: string]: any } {
    const colorArray = this.imageData.dominantColor.split(',');
    const red = Number(colorArray[0]?.trim());
    const green = Number(colorArray[1]?.trim());
    const blue = Number(colorArray[2]?.trim());
    return {
      background: `linear-gradient(130deg,rgba(${red},${green},${blue},0.8),rgba(116, 114, 249, 0.8))`,
    }
  }

}
