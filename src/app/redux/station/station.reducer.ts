import { createReducer, on } from '@ngrx/store';
import { resetStation, setStation } from './station.actions';
import { StationUtils as utils } from './station.utils';

const initialState = utils.getInitialState();

export const stationReducer = createReducer(
  initialState,

  on(setStation, (state, { station }) => {
    utils.setAndPersist(station);
    return { ...state, ...station };
  }),

  on(resetStation, () => {
    utils.clearPersist();
    return {
      id: '',
      latitude: 0,
      longitude: 0,
      temperature: 0,
      ubication: '',
      client: '',
    };
  })
);
