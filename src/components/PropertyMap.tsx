'use client'

import { PropertyType } from "../../types/property";
import { useState, useEffect, useRef } from "react";
import opencage from "opencage-api-client";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import MapSpinner from "./MapSpinner";

interface PropertyMapProps {
    property: PropertyType;
}


const PropertyMap = ({ property }: PropertyMapProps) => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [geoCodeError, setGeoCodeError] = useState(false);

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<maptilersdk.Map | null>(null);

    const { location } = property;
    const { city, state, zipcode, street } = location;

    // OpenCage Geocoding - https://opencagedata.com/tutorials/geocode-in-nodejs
    useEffect(() => {
        async function fetchCoordinates() {
            opencage
                .geocode({
                    q: `${street} ${city} ${state} ${zipcode}`,
                    key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY
                })
                .then((data) => {
                    if (data.status.code === 200 && data.results.length > 0) {
                        const place = data.results[0];
                        console.log(place.geometry);
                        setLat(place.geometry.lat);
                        setLng(place.geometry.lng);
                        setLoading(false);
                    } else {
                        console.log('status', data.status.message);
                        console.log('total_results', data.total_results);
                        setLoading(false);
                        setGeoCodeError(true);
                    }
                })
                .catch((error) => {
                    console.error('Error;', error.message);
                    setGeoCodeError(true);
                    // other possible response codes:
                    // https://opencagedata.com/api#codes
                    if (error.status?.code === 402) {
                        console.log(`You've hit free trial daily limit`);
                        console.log('become a customer: https://opencagedata.com/pricing');
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        fetchCoordinates();
    }, [street, city, state, zipcode]);

    // MapTiler Map - https://docs.maptiler.com/react/
    useEffect(() => {
        if (map.current) return; // stops map from initializing more than once

        // Display map if not loading and coordinates are available
        if (!loading && lat !== null && lng !== null) {
            maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;
            map.current = new maptilersdk.Map({
                container: mapContainer.current as HTMLElement,
                style: maptilersdk.MapStyle.STREETS,
                center: [lng, lat],
                zoom: 14
            });

            new maptilersdk.Marker({ color: "#00a63e" })
                .setLngLat([lng, lat])
                .addTo(map.current);
        }

        return () => map.current?.remove(); // Clean up MapTiler map
    }, [lng, lat, loading]);

    if (loading) return <MapSpinner />

    if (geoCodeError) return <div className="text-xl">No location data found</div>

    return (
        <div ref={mapContainer} style={{ height: '450px', width: '100%' }} className="map" />
    )
}

export default PropertyMap;