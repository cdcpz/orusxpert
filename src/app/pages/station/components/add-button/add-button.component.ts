import { NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CIRCLE_DEFAULT_STYLE } from '@shared/models/styles.model';

@Component({
  standalone: true,
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
  imports: [NgStyle, NgIf]
})
export class AddButtonComponent {
  /**
   * assets/icons/your-icon.svg
   */
  @Input() icon!: string;
  @Input() label!: string;
  @Input() style: Record<string, any> = CIRCLE_DEFAULT_STYLE;
  @Output() action = new EventEmitter<MouseEvent>();

  constructor() {
    //this.icon = 'assets/icons/CloseCircle.svg'
  }

  emit(event:MouseEvent) {
    if(this.action) this.action.emit(event)
  }
}
