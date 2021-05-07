import { all, fork } from "redux-saga/effects";

import chargerSaga from "./charger/sagas";

export function* rootSaga() {
    yield all([fork(chargerSaga)]);
}
