import { DirectionsDataContext } from "@/context/directions-data-context";
import { SelectedCarAmountContext } from "@/context/selected-car-amount-context";
import CarsList, { Car } from "@/data/CarsList";
import Image from "next/image";
import { useContext, useState } from "react";
import { useNotification } from '@/context/notification-context';

interface CarsProps {
  isSharedRide: boolean;
  passengers: number;
}

export default function Cars({ isSharedRide, passengers }: CarsProps) {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const { directionsData } = useContext(DirectionsDataContext) ?? {};
  const { setCarAmount } = useContext(SelectedCarAmountContext) ?? {};
  const { showNotification } = useNotification();

  const getCost = (charges: number) => {
    if (!directionsData?.routes?.[0]?.distance) return "0.00";
    const cost = (directionsData.routes[0].distance / 1000) * charges;
    return isSharedRide ? (cost / passengers).toFixed(2) : cost.toFixed(2);
  };

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car.id);
    if (setCarAmount) {
      setCarAmount(getCost(car.charges));
      showNotification(`Selected ${car.name}`, 'success');
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-medium text-[14px] text-foreground">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {CarsList.map((car: Car) => (
          <button
            type="button"
            key={car.id}
            className={`m-2 p-2 border-[1px] rounded-md hover:border-primary cursor-pointer bg-background ${
              car.id === selectedCar ? "border-primary border-[2px]" : "border-border"
            }`}
            onClick={() => handleCarSelect(car)}
          >
            <Image
              src={car.image}
              alt={car.name}
              width={75}
              height={90}
              className={`w-full ${car.image.includes('Auto4') ? 'scale-75' : ''}`}
            />
            <h2 className="text-[10px] text-gray-500 dark:text-gray-400">
              {car.name}
              {directionsData?.routes && (
                <span className="float-right font-medium text-foreground">
                  ₹{getCost(car.charges)}
                  {isSharedRide && (
                    <span className="text-[8px] text-green-500 block">
                      per person
                    </span>
                  )}
                </span>
              )}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
} 