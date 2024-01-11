import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IModal,
  IPoint,
  initialStateModal,
} from '@shared/models/layout-modal.model';
import { CIRCLE_DEFAULT_STYLE } from '@shared/models/styles.model';
import { StationServiceService } from './services/station-service.service';
import { resetStation, setStation } from '@redux/station/station.actions';
import { IStation } from './models/station.model';
import { IPlace, IPosition, initialStatePlace } from '@shared/models/map.model';

interface IStationModal {
  crud: IModal;
  detail: IModal;
}

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  places: IPlace[] = [];
  place: IPlace = initialStatePlace;
  modal: IStationModal = {
    crud: initialStateModal,
    detail: initialStateModal,
  };
  buttonStyle: Record<string, any>;
  center: IPosition = {
    lat: 4.6356,
    lng: -74.1407,
  };

  options: google.maps.MapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  constructor(
    private readonly store: Store<{ point: IPoint }>,
    private readonly _stationService: StationServiceService
  ) {
    this.buttonStyle = {
      ...CIRCLE_DEFAULT_STYLE,
      height: '60px',
      width: '65px',
      border: '4px solid #25c1e4',
    };
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._stationService.getStation().subscribe((data) => {
      this.places = data;
    });
  }

  save(data: IStation) {
    this._stationService.postStation(data).subscribe((data) => {
      this.place = initialStatePlace;
      this.getAll();
      this.store.dispatch(resetStation());
    });
  }

  edit() {
    this.getAll();
    if (this.place != null) {
      this.store.dispatch(setStation({ station: this.place.station }));
    }
  }
  delete(id: string) {
    this._stationService.deleteStation(id).subscribe((data) => {
      this.getAll();
      this.modal.crud = {
        ...this.modal.detail,
        show: false,
      };
      this.place = initialStatePlace;
    });
  }

  result(place: IPlace) {
    this.place = place;
  }

  emit(event: MouseEvent) {
    if (this.place.station.id == '') return;
    let { clientX, clientY } = event;
    this.edit();

    this.modal.detail = {
      show: true,
      showClose: true,
      showDelete: true,
      x: clientX,
      y: clientY,
      firstAction: () => {
        this.modal.detail = {
          ...this.modal.detail,
          show: false,
        };
        this.setCrudModal();
      },
      secondAction: () => {},
    };
  }

  setCrudModal() {
    this.modal.crud = {
      ...this.modal.detail,
      show: true,
      firstAction: () => {
        this._stationService
          .putStation(this.place.station)
          .subscribe((data) => {
            this.getAll();
          });
        this.modal = {
          detail: {
            ...this.modal.detail,
            show: true,
          },
          crud: {
            ...this.modal.crud,
            show: false,
          },
        };
      },
      secondAction: () => {
        this.modal = {
          detail: {
            ...this.modal.detail,
            show: true,
          },
          crud: {
            ...this.modal.crud,
            show: false,
          },
        };
      },
    };
  }

  close() {
    this.place = initialStatePlace;
  }

  openCrudModal(x: number, y: number) {
    this.modal.crud = {
      ...this.modal.detail,
      show: true,
      showClose: false,
      showDelete: false,
      x: -20,
      y: 130,
      firstAction: () => {
        this.save(this.place.station);
        this.getAll();
        this.modal = {
          ...this.modal,
          crud: {
            ...this.modal.crud,
            show: false,
          },
        };
        this.place = initialStatePlace;
      },
      secondAction: () => {
        this.modal = {
          ...this.modal,
          crud: {
            ...this.modal.crud,
            show: false,
          },
        };
        this.place = initialStatePlace;
      },
    };
  }

  dispatch(
    modal: 'crud' | 'detail',
    action: 'firstAction' | 'secondAction',
    data?: IStation
  ) {
    if (data != null) {
      this.place.station = data;
    }
    if (this.modal[modal][action]) this.modal[modal][action]();
  }

  toggle(event: MouseEvent) {
    let { clientX, clientY } = event;
    this.store.dispatch(resetStation());
    this.openCrudModal(clientX, clientY);
  }
}
