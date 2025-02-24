import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { useContext, useEffect, useState, useRef } from "react";

interface AddressSuggestion {
  mapbox_id: string;
  full_address: string;
}

export default function AutocompleteAddress() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const [addressList, setAddressList] = useState<AddressSuggestion[]>([]);
  const [sourceChange, setSourceChange] = useState<boolean>(false);
  const [destinationChange, setDestinationChange] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { setSourceCoordinates } = useContext(SourceCoordinatesContext) ?? {};
  const { setDestinationCoordinates } =
    useContext(DestinationCoordinatesContext) ?? {};

  const destinationInputRef = useRef<HTMLInputElement>(null);

  // Fetch address suggestions based on input change
  const fetchAddressList = async (query: string) => {
    try {
      if (!query) {
        setAddressList([]);
        return;
      }
      const res = await fetch(`/api/search-address?q=${encodeURIComponent(query)}`, {
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      // Ensure we're getting and setting the full address suggestions
      setAddressList(result.suggestions?.map((suggestion: any) => ({
        mapbox_id: suggestion.mapbox_id,
        full_address: suggestion.place_formatted || suggestion.full_address
      })) || []);
    } catch (error) {
      console.error("Failed to fetch address list:", error);
      setAddressList([]);
    }
  };

  // Trigger address fetch only for the active input field
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (sourceChange) {
        fetchAddressList(source);
      } else if (destinationChange) {
        fetchAddressList(destination);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [source, destination, sourceChange, destinationChange]);

  const handleAddressClick = async (
    suggestion: AddressSuggestion,
    isSource: boolean
  ) => {
    if (isSource) {
      setSource(suggestion.full_address);
      setSourceChange(false);
      setTimeout(() => {
        destinationInputRef.current?.focus();
      }, 100);
    } else {
      setDestination(suggestion.full_address);
      setDestinationChange(false);
    }

    setAddressList([]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAPBOX_BASE_RETRIEVE_URL}/${suggestion.mapbox_id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();

      const coordinates = {
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      };

      if (isSource && setSourceCoordinates) {
        setSourceCoordinates(coordinates);
      } else if (!isSource && setDestinationCoordinates) {
        setDestinationCoordinates(coordinates);
      }
    } catch (error) {
      console.error("Error fetching data from Mapbox:", error);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    isSource: boolean
  ) => {
    if (addressList.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < addressList.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : prev
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleAddressClick(addressList[selectedIndex], isSource);
          setSelectedIndex(-1);
        }
        break;
      case "Escape":
        setAddressList([]);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <form className="flex flex-col gap-3">
      {/* Source Input */}
      <div className="relative">
        <label className="text-gray-400 dark:text-gray-500 text-[13px]" htmlFor="source">
          Enter pick-up location?
        </label>
        <input
          type="text"
          name="source"
          id="source"
          className="bg-background p-1 border-[1px] border-border w-full rounded-md outline-none focus:border-primary text-[14px] text-foreground"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
          onKeyDown={(e) => handleKeyDown(e, true)}
        />

        {addressList.length > 0 && sourceChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-background border border-border z-20">
            {addressList.map((suggestion, index) => (
              <button
                type="button"
                key={suggestion.mapbox_id}
                className={`p-3 w-full text-left text-foreground ${
                  index === selectedIndex 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-accent'
                }`}
                onClick={() => handleAddressClick(suggestion, true)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion.full_address}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Destination Input */}
      <div className="relative">
        <label className="text-gray-400 dark:text-gray-500 text-[13px]" htmlFor="destination">
          Destination
        </label>
        <input
          ref={destinationInputRef}
          type="text"
          name="destination"
          id="destination"
          className="bg-background p-1 border-[1px] border-border w-full rounded-md outline-none focus:border-primary text-[14px] text-foreground"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
          }}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />

        {addressList.length > 0 && destinationChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-background border border-border z-10">
            {addressList.map((suggestion, index) => (
              <button
                type="button"
                key={suggestion.mapbox_id}
                className={`p-3 w-full text-left text-foreground ${
                  index === selectedIndex 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-accent'
                }`}
                onClick={() => handleAddressClick(suggestion, false)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion.full_address}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
