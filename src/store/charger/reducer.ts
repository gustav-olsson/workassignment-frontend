import {
    FETCH_CHARGER_LOCATIONS_SUCCESS,
    SET_SHOW_CHARGER_MODAL,
    FETCH_SELECTED_CHARGER_SUCCESS,
} from "./constants";

import { ChargerActions, ChargerState } from "./action.types";

const initialState: ChargerState = {
    chargerLocations: [],
    selectedCharger: null,
    showChargerModal: false
};

export default (state = initialState, action: ChargerActions) => {
    switch (action.type) {
        case FETCH_CHARGER_LOCATIONS_SUCCESS:
            return {
                ...state,
                pending: false,
                chargerLocations: action.payload.chargerLocations,
                error: null,
            };
        case SET_SHOW_CHARGER_MODAL:
            return {
                ...state,
                showChargerModal: action.payload.showChargerModal,
            };
        case FETCH_SELECTED_CHARGER_SUCCESS:
            return {
                ...state,
                selectedCharger: action.payload.selectedCharger,
            };
        default:
            return {
                ...state,
            };
    }
};
