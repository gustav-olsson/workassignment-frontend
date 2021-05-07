import defaultAxios from 'axios'
import {ICharger, IChargerLocation} from "./action.types";

const axios = defaultAxios.create({
    baseURL: 'http://localhost:5000/Charger/',
    headers: {'Content-Type': 'application/json'}
});

export const getChargerLocations:(boundingBox:string) => Promise<IChargerLocation[] | void> = async (boundingBox:string) => {
    try {
        let payload = await axios.get('chargerLocations?boundingBox='+ boundingBox)
        return payload.data;
    } catch(err) {
        return console.error(err)
    }
}

export const getCharger:(chargerId:number) => Promise<ICharger | void> = async (chargerId:number) => {
    try {
        let payload = await axios.get('charger?chargerId='+ chargerId)
        return payload.data;
    } catch(err) {
        return console.error(err)
    }
}
