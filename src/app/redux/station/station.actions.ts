import { createAction, props } from '@ngrx/store';
import { IStation } from 'src/app/pages/station/models/station.model';

export const setStation = createAction(
  '[Station] Set',
  props<{station : IStation}>()
);

export const resetStation = createAction(
  '[Station] Reset'
);
