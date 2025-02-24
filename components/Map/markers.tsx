"use client";

import { useContext } from "react";
import { Marker } from "react-map-gl";
import { UserLocationContext } from "@/context/user-location-context";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";

export default function Markers() {
  const { userLocation } = useContext(UserLocationContext) ?? {};
  const { sourceCoordinates } = useContext(SourceCoordinatesContext) ?? {};
  const { destinationCoordinates } = useContext(DestinationCoordinatesContext) ?? {};

  return (
    <>
      {/* User's current location marker */}
      {userLocation && (
        <Marker
          longitude={userLocation.lng}
          latitude={userLocation.lat}
          anchor="bottom"
        >
          <div className="relative cursor-pointer">
            <div className="absolute w-5 h-5 bg-blue-500 rounded-full animate-ping" />
            <div className="w-5 h-5 bg-blue-600 rounded-full" />
          </div>
        </Marker>
      )}

      {sourceCoordinates && (
        <Marker
          longitude={sourceCoordinates.lng}
          latitude={sourceCoordinates.lat}
          anchor="bottom"
        >
          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full" />
          </div>
        </Marker>
      )}

      {destinationCoordinates && (
        <Marker
          longitude={destinationCoordinates.lng}
          latitude={destinationCoordinates.lat}
          anchor="bottom"
        >
          <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full" />
          </div>
        </Marker>
      )}
    </>
  );
}