import React, { useState,  useRef, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import mapboxgl from 'mapbox-gl';
// @ts-ignore
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// @ts-ignore
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.min';
import '../App.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {getChargerLocationsSelector} from "../store/charger/selectors";
import {
    fetchChargerLocationsRequest,
    fetchSelectedChargerRequest,
    setShowChargerModal
} from "../store/charger/actions";
import {IChargerLocation} from "../store/charger/action.types";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string;

const mapStateToProps = (state:any) => {
    return {
        chargerLocations : getChargerLocationsSelector(state),
    };
};

const mapDispatchToProps = {
    getChargers: fetchChargerLocationsRequest,
    setShowChargerModal: setShowChargerModal,
    setSelectedCharger: fetchSelectedChargerRequest,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
const MyMap = ({ getChargers, setShowChargerModal, chargerLocations, setSelectedCharger }: PropsFromRedux) => {
    const [markers, serMarkers] = useState<Array<mapboxgl.Marker>>([])
    const [map, setMap] = useState<any>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const getNewChargerLocations = (initMap:any) => {
        let bbox = initMap.getBounds();
        let northEast = bbox.getNorthEast().toArray();
        let southWest = bbox.getSouthWest().toArray();
        let boundingBox = "(" + northEast[1] + "," + northEast[0] + "),(" + southWest[1] + "," + southWest[0] + ")"

        getChargers(boundingBox);
    }

    const setMapMarkers = (chargerLocations: Array<IChargerLocation>) => {
        markers.forEach((marker) => {
            marker.remove();
        })

        let newMarkers = chargerLocations?.map((charger):mapboxgl.Marker => {
            let marker = new mapboxgl.Marker()
                .setLngLat([Number.parseFloat(charger.longitude), Number.parseFloat(charger.latitude)])
                .addTo(map);
            marker.getElement().addEventListener('click', () => {
                setShowChargerModal(true);
                setSelectedCharger(charger.chargerId)
            });
            return marker
        }) || [];
        serMarkers(newMarkers);
    }

    useEffect(() => {
        if (map) {
            setMapMarkers(chargerLocations);
        }
    }, [chargerLocations]);

    useEffect(() => {
        const initMap = new mapboxgl.Map({
            container: mapContainerRef.current as HTMLDivElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [17.993101093839936, 59.381522269123565],
            zoom: 12.5,
        });

        initMap.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );
        initMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        initMap.on('moveend', () => getNewChargerLocations(initMap));
        initMap.on('load', () => getNewChargerLocations(initMap))

        setMap(initMap);
        return () => initMap.remove();
    }, []);

    return <div className="map-container" ref={mapContainerRef} />;
};

export default connector(MyMap);
