import { IStation, initialStateStation } from "src/app/pages/station/models/station.model";
import { LS } from "src/app/shared/models/storage.model";

const getInitialState = () => {
    return (
        localStorage.getItem(LS.Station) ? 
        JSON.parse(localStorage.getItem(LS.Station) as string) as IStation : 
        initialStateStation
    )
}

const setAndPersist = (Station:IStation) => {
    let stringify = JSON.stringify(!Station ? initialStateStation : Station)
    localStorage.setItem(LS.Station, stringify)
}

const clearPersist = () => {
    localStorage.removeItem(LS.Station)
}

export const StationUtils = {
    getInitialState: getInitialState,
    setAndPersist: setAndPersist,
    clearPersist: clearPersist
}