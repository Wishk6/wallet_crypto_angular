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

  @Input() image: string = '';

  constructor() {
  }

  ngAfterViewInit() {
    // TODO : analyser l'image et extraire la couleur dominante
  }
}
