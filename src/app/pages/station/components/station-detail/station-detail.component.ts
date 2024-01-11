import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IStation,
  initialStateStation,
} from '@pages/station/models/station.model';
import {
  DEFAULT_STYLE,
  IModal,
  handleCoordinate,
  initialStateModal,
} from '@shared/models/layout-modal.model';
import { CIRCLE_DEFAULT_STYLE } from '@shared/models/styles.model';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.scss'],
})
export class StationDetailComponent {
  @Input() state: IModal = initialStateModal;
  @Input() data: IStation = initialStateStation;
  @Output() editAction = new EventEmitter<MouseEvent>();
  @Output() closeAction = new EventEmitter<void>();

  style: Record<string, any> = DEFAULT_STYLE;
  buttonStyle: Record<string, any>;

  get x() {
    return handleCoordinate(this.state.x);
  }

  get y() {
    return handleCoordinate(this.state.y);
  }

  constructor() {
    this.buttonStyle = {
      ...CIRCLE_DEFAULT_STYLE,
      height: '24px',
    };
  }

  ngOnInit(): void {}

  hide() {
    this.state.show = false;
    this.closeAction.emit();
  }
}
