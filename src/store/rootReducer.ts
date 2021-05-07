import { combineReducers } from "redux";

import chargerReducer from "./charger/reducer";

const rootReducer = combineReducers({
    charger: chargerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
