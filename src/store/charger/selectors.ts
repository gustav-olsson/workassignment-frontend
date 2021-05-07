import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const getSelectedCharger = ({ charger }: AppState) => charger.selectedCharger;
const getShowChargerModel = ({ charger }: AppState) => charger.showChargerModal;
const getChangerLocations = ({ charger }: AppState) => charger.chargerLocations;

export const getChargerLocationsSelector = createSelector(getChangerLocations, (chargerLocations) => chargerLocations);
export const getShowChargerModelSelector = createSelector(getShowChargerModel, (showModel) => showModel);
export const getSelectedChargerSelector = createSelector(getSelectedCharger, (charger) => charger);
