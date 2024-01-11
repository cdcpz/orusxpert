import { Injectable } from '@angular/core';
import { IStation } from '../models/station.model';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

import { Observable, Subject } from 'rxjs';
import {
  IMark,
  IPlace,
  handleColor,
  handleIcon,
} from '@shared/models/map.model';

@Injectable({
  providedIn: 'root',
})
export class StationServiceService {

  constructor(private http:HttpClient) { }

  getStationByid(id:string):Observable<IStation> {
    return this.http.get<IStation>(`${env.host}${id}`);
  }

  getStation():Observable<IPlace[]>{
    let $service = new Subject<IPlace[]>()
    this.http.get<IStation[]>(env.host).subscribe(response => {
      $service.next(response.map((item:IStation) => {
        return {
          mark: {
            label: {
              text: item.ubication,
              color: handleColor(item.temperature)
            },
            position: {
              lat: item.latitude,
              lng: item.longitude
            },
            title: item.client,
            icon: handleIcon(item.temperature)
          } as IMark,
          station: item
        }
      }))
    })
    return $service
  }
  
  putStation(data:IStation):Observable<IStation>{
    return this.http.put<IStation>(`${env.host}${data.id}`, data);
  }

  postStation(data:IStation){
    return this.http.post<IStation>(env.host, data);
  }
  
  deleteStation(id:string){
    return this.http.delete<IStation>(`${env.host}${id}`);
  }
}
