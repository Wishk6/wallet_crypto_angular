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
  @Input() styleObject: { [key: string]: any } = {};
  @Input() iconStyleObject: { [key: string]: any } = {
    display: 'flex',
    borderRadius: '10rem',
    padding: '7px',
    background: 'rgba(var(--primary),0.6)',
    color: 'rgba(var(--secondary-background), 0.8)',
  };
}


