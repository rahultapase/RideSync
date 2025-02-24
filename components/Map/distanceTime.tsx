import { DirectionsDataContext } from "@/context/directions-data-context";
import { useContext } from "react";

export default function DistanceTime() {
  const { directionsData } = useContext(DirectionsDataContext) ?? {};

  return (
    directionsData?.routes && (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Distance:</span>
            <span className="font-semibold text-primary">
              {(directionsData?.routes[0]?.distance / 1000).toFixed(2)} km
            </span>
          </div>
          <div className="w-[1px] h-4 bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Duration:</span>
            <span className="font-semibold text-primary">
              {(directionsData?.routes[0]?.duration / 60).toFixed(2)} min
            </span>
          </div>
        </div>
      </div>
    )
  );
}
