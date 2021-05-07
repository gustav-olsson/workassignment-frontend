import { all, call, put, takeLatest } from "redux-saga/effects";

import {fetchChargerLocationsSuccess, fetchSelectedChargerSuccess} from "./actions";
import {FETCH_CHARGER_LOCATIONS_REQUEST, FETCH_SELECTED_CHARGER_REQUEST} from "./constants";
import {FetchChargerLocationsRequest, FetchSelectedChargerRequest, ICharger, IChargerLocation} from "./action.types";
import {getCharger, getChargerLocations} from "./api";


function* fetchChargerLocationsSaga(action:FetchChargerLocationsRequest) {
    try {
        let response: IChargerLocation[] = yield call(getChargerLocations, action.boundingBox);
        yield put(
            fetchChargerLocationsSuccess({
                chargerLocations: response,
            })
        );
    } catch (e) {
        console.log("Error", e)
    }
}

function* fetchSelectedChargerSaga(action:FetchSelectedChargerRequest) {
    try {
        let response: ICharger = yield call(getCharger, action.chargerId);
        yield put(
            fetchSelectedChargerSuccess({
                selectedCharger: response,
            })
        );
    } catch (e) {
        console.log("Error", e)
    }
}

function* chargerLocationsSaga() {
    yield all([
        takeLatest(FETCH_CHARGER_LOCATIONS_REQUEST, fetchChargerLocationsSaga),
        takeLatest(FETCH_SELECTED_CHARGER_REQUEST, fetchSelectedChargerSaga),
    ]);
}

export default chargerLocationsSaga;
