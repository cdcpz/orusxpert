export const DEFAULT_STYLE: Record<string, any> = {
    'top': '0',
    'left': '0'
}

export interface IComponent {
    name: string,
    path: string
}

export interface IPoint {
    x: number,
    y: number,
    children: IComponent
}

export const initialStatePoint: IPoint = {
    x: 0,
    y: 0,
    children: {
        name: '',
        path: ''
    }
}

export interface IModal {
    x: number,
    y: number,
    show: boolean,
    showClose: boolean,
    showDelete: boolean
    firstAction: () => void,
    secondAction: () => void
}

export const initialStateModal: IModal = {
    x: 0,
    y: 0,
    show: false,
    showClose: false,
    showDelete: false,
    firstAction: () => { },
    secondAction: () => { },
    
}

export const handleCoordinate = (coordinate:number) => {
    return `${coordinate}px`
}