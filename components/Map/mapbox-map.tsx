"use client";

import { UserLocationContext } from "@/context/user-location-context";
import { useCallback, useContext, useEffect, useRef, useMemo, useState } from "react";
import Map, { MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./markers";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import { DirectionsDataContext } from "@/context/directions-data-context";
import MapboxRoute from "./mapbox-route";
import DistanceTime from "./distanceTime";
import { LoadingSpinner } from "@/components/UI/loading-spinner";

export default function MapboxMap() {
  const mapRef = useRef<MapRef | null>(null);
  const { userLocation } = useContext(UserLocationContext) ?? {};
  const { sourceCoordinates } = useContext(SourceCoordinatesContext) ?? {};
  const { destinationCoordinates } = useContext(DestinationCoordinatesContext) ?? {};
  const { directionsData, setDirectionsData } = useContext(DirectionsDataContext) ?? {};

  // Add useMemo for default location
  const defaultLocation = useMemo(() => ({
    lng: 72.8777,
    lat: 19.0760,
    zoom: 11
  }), []);

  // Add loading state
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const getDirectionRoute = useCallback(async () => {
    if (!sourceCoordinates || !destinationCoordinates) {
      console.error("Source or destination coordinates are missing");
      return;
    }

    // Corrected Mapbox Directions API URL
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoordinates.lng},${sourceCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`;

    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Mapbox API error: ${res.statusText}`);
      }

      const result = await res.json();
      setDirectionsData?.(result);
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  }, [sourceCoordinates, destinationCoordinates, setDirectionsData]);

  // Fly to source coordinates when they are available
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  // Fly to destination coordinates and fetch the route when both are available
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
        duration: 2500,
      });
      if (sourceCoordinates) {
        getDirectionRoute();
      }
    }
  }, [destinationCoordinates, sourceCoordinates, getDirectionRoute]);

  return (
    <div className="p-5 h-[calc(100vh-100px)]">
      {!isMapLoaded && <LoadingSpinner />}
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden h-full">
        <Map
          ref={mapRef}
          onLoad={() => setIsMapLoaded(true)}
          reuseMaps
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}
          initialViewState={{
            longitude: userLocation?.lng || defaultLocation.lng,
            latitude: userLocation?.lat || defaultLocation.lat,
            zoom: userLocation ? 14 : defaultLocation.zoom,
          }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {isMapLoaded && (
            <>
              <Markers />
              {directionsData?.routes && (
                <MapboxRoute
                  coordinates={directionsData?.routes[0]?.geometry?.coordinates}
                />
              )}
            </>
          )}
        </Map>
      </div>
      <div className="absolute bottom-[50px] z-20 right-[100px] md:right-[120px]">
        <DistanceTime />
      </div>
    </div>
  );
}