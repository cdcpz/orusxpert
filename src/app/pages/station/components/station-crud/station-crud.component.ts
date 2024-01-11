import { NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {IStation,initialStateStation,} from '@pages/station/models/station.model';
import {
  DEFAULT_STYLE,
  IModal,
  handleCoordinate,
  initialStateModal,
} from '@shared/models/layout-modal.model';
import { CIRCLE_DEFAULT_STYLE } from '@shared/models/styles.model';

@Component({
  selector: 'app-station-crud',
  templateUrl: './station-crud.component.html',
  styleUrls: ['./station-crud.component.scss'],
})
export class StationCrudComponent {
  @Input() state: IModal = initialStateModal;
  @Input() data: IStation = initialStateStation;
  @Output() cancelAction = new EventEmitter<MouseEvent>();
  @Output() confirmAction = new EventEmitter<IStation>();
  @Output() deleteAction = new EventEmitter<string>();

  style: Record<string, any> = DEFAULT_STYLE;
  buttonStyle: Record<string, any>;
  formulario!: FormGroup;

  get x() {
    return this.state.x > 0 ? handleCoordinate(this.state.x) : undefined;
  }

  get y() {
    return handleCoordinate(this.state.y);
  }

  get right() {
    return this.state.x < 0 ? handleCoordinate(this.state.x) : undefined;
  }

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store<{ station: IStation }>
  ) {
    this.formBuilde();
    this.buttonStyle = {
      ...CIRCLE_DEFAULT_STYLE,
      height: '24px',
    };
  }

  ngOnInit(): void {
    this.store.select('station').subscribe((data) => {
      this.formulario.patchValue({ ...data });
    });
  }

  hide() {
    this.state.show = false;
  }

  accept() {
    this.confirmAction.emit(this.formulario.value);
  }

  formBuilde() {
    this.formulario = this.formBuilder.group({
      id: '',
      latitude: 0,
      longitude: 0,
      temperature: 0,
      ubication: '',
      client: '',
    });
  }
}
