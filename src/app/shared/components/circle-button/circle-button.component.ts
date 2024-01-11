import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CIRCLE_DEFAULT_STYLE } from '../../models/styles.model';

@Component({
  standalone: true,
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.scss'],
  imports: [NgStyle]
})
export class CircleButtonComponent {
  /**
   * assets/icons/your-icon.svg
   */
  @Input() icon!: string;
  @Input() style: Record<string, any> = CIRCLE_DEFAULT_STYLE;
  @Output() action = new EventEmitter<Event>();

  constructor() {}

  emit(event:Event) {
    if(this.action) this.action.emit(event)
  }
}
