import {
    FETCH_CHARGER_LOCATIONS_REQUEST,
    FETCH_CHARGER_LOCATIONS_SUCCESS,
    SET_SHOW_CHARGER_MODAL,
    FETCH_SELECTED_CHARGER_SUCCESS,
    FETCH_SELECTED_CHARGER_REQUEST
} from "./constants";

export interface IChargerLocation {
    chargerId: number;
    title: string;
    latitude: string;
    longitude: string;
}

export interface ICharger {
    chargerId: number;
    addressInfo: IAddress
    connections: IConnection[]
    mediaItems: IMedia[]
}

export interface IAddress {
    streetName: number;
    town: string;
    postcode: string;
    latitude: string;
    longitude: string;
    countryId: number;
    contactPhoneNumber: string;
    distanceUnit: number;
    title: string;
}
export interface IMedia {
    mediaUrl: string;
}
export interface IConnection {
    amps: number;
    powerKw: string;
    voltage: number;
    quantity: number;
}

export interface ChargerState {
    chargerLocations: IChargerLocation[];
    selectedCharger: ICharger | null;
    showChargerModal: boolean;
}

export interface FetchChargerLocationsSuccessPayload {
    chargerLocations: IChargerLocation[];
}

export interface FetchSelectedChargerSuccessPayload {
    selectedCharger: ICharger;
}

export interface SetShowChargerModalPayload {
    showChargerModal: boolean;
}

export interface FetchChargerLocationsRequest {
    type: typeof FETCH_CHARGER_LOCATIONS_REQUEST;
    boundingBox: string
}

export type FetchChargerLocationsResponse = {
    type: typeof FETCH_CHARGER_LOCATIONS_SUCCESS;
    payload: FetchChargerLocationsSuccessPayload;
};

export type FetchSelectedChargerResponse = {
    type: typeof FETCH_SELECTED_CHARGER_SUCCESS;
    payload: FetchSelectedChargerSuccessPayload;
};

export type SetShowChargerModal = {
    type: typeof SET_SHOW_CHARGER_MODAL;
    payload: SetShowChargerModalPayload;
};

export type FetchSelectedChargerRequest = {
    type: typeof FETCH_SELECTED_CHARGER_REQUEST;
    chargerId: number;
};

export type ChargerActions =
    | FetchChargerLocationsRequest
    | FetchChargerLocationsResponse
    | FetchSelectedChargerResponse
    | SetShowChargerModal;
