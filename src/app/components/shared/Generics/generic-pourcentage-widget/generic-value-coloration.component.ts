import {Component,Input} from '@angular/core';
import {DecimalPipe,NgClass,NgStyle} from "@angular/common";

@Component({
  selector: 'app-generic-value-coloration',
  standalone: true,
  imports: [
    NgClass,
    DecimalPipe,
    NgStyle
  ],
  templateUrl: './generic-value-coloration.component.html',
  styleUrls: ['./generic-value-coloration.component.scss']
})
export class GenericValueColorationComponent {

  @Input() value: string | number = '0';
  @Input() sign: string = '%';
  @Input() wantBackgroundColored: boolean = true;
  @Input() wantColors: boolean = true;
  // see https://angular.io/api/common/DecimalPipe for more info on digitsInfo format
  @Input() digitsInfo: string = '1.0-1';

  constructor() {
  }

  getColor(): string {
    if (typeof this.value === "string") {
      this.value = parseFloat(this.value);
    }

    if (!this.wantColors || this.value === 0) {
      return 'white';
    } else if (this.value > 0) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
