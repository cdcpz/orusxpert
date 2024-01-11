export interface IStation {
    id: string,
    latitude: number,
    longitude: number,
    temperature: number,
    ubication: string,
    client: string
}

export const initialStateStation: IStation = {
    id: "",
    latitude: 0,
    longitude: 0,
    temperature: 0,
    ubication: "",
    client: ""
}