import {Component,Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-generic-action-button',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './generic-action-button.component.html',
  styleUrls: ['./generic-action-button.component.scss']
})
export class GenericActionButtonComponent {

  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() wantUppercase: boolean = true;
  @Input() wantMiniFab: boolean = false;
  @Input() iconName: string = '';
}


