import { IStation, initialStateStation } from "@pages/station/models/station.model"

export interface IPosition {
    lat: number,
    lng: number
}
export interface ILabel {
    color: 'blue'|'green'|'red',
    text: string
}
export interface IMark {
    title: string,
    position: IPosition,
    // label: ILabel,
    icon: string
}

export interface IPlace {
    mark: IMark,
    station: IStation
}

export const initialStatePlace : IPlace = {
    mark: {
        title: "",
        position: {
            lat: 0,
            lng: 0
        },
        // label: {
        //     color: "red",
        //     text: ""
        // },
        icon: ''
    },
    station: initialStateStation
}

export const handleColor = (temp:number) => {
    if(temp < 15) return 'blue'
    if(temp >= 15 && temp <= 25) return 'green'
    if(temp > 25) return 'red'
    return 'red'
}

export const handleIcon = (temp:number) => {
    if(temp < 15) return 'assets/icons/blue.svg'
    if(temp >= 15 && temp <= 25) return 'assets/icons/green.svg'
    if(temp > 25) return 'assets/icons/red.svg'
   return 0
}