import {
    FETCH_CHARGER_LOCATIONS_REQUEST,
    FETCH_CHARGER_LOCATIONS_SUCCESS,
    SET_SHOW_CHARGER_MODAL,
    FETCH_SELECTED_CHARGER_SUCCESS,
    FETCH_SELECTED_CHARGER_REQUEST,
} from "./constants";
import {
    FetchChargerLocationsRequest,
    FetchChargerLocationsResponse,
    FetchChargerLocationsSuccessPayload,
    SetShowChargerModal,
    FetchSelectedChargerSuccessPayload, FetchSelectedChargerResponse, FetchSelectedChargerRequest,
} from "./action.types";

export const fetchChargerLocationsRequest = (boundingBox:string): FetchChargerLocationsRequest => ({
    type: FETCH_CHARGER_LOCATIONS_REQUEST,
    boundingBox
});

export const fetchSelectedChargerRequest = (chargerId:number): FetchSelectedChargerRequest => ({
    type: FETCH_SELECTED_CHARGER_REQUEST,
    chargerId
});

export const fetchChargerLocationsSuccess = (
    payload: FetchChargerLocationsSuccessPayload
): FetchChargerLocationsResponse => ({
    type: FETCH_CHARGER_LOCATIONS_SUCCESS,
    payload,
});


export const fetchSelectedChargerSuccess = (
    payload: FetchSelectedChargerSuccessPayload
): FetchSelectedChargerResponse => ({
    type: FETCH_SELECTED_CHARGER_SUCCESS,
    payload,
});

export const setShowChargerModal = (
    showChargerModal: boolean
): SetShowChargerModal => ({
    type: SET_SHOW_CHARGER_MODAL,
    payload: { showChargerModal },
});
