interface Car {
  id: number;
  name: string;
  image: string;
  charges: number;
}

const CarsList: Car[] = [
  {
    id: 1,
    name: "Auto",
    image: "/Auto1.png",
    charges: 15,
  },
  {
    id: 2,
    name: "Economy",
    image: "/wagonr.jpeg",
    charges: 17,
  },
  {
    id: 3,
    name: "Comfort",
    image: "/dzire.jpeg",
    charges: 20,
  },
  {
    id: 4,
    name: "XL Car",
    image: "/innova.jpeg",
    charges: 23,
  },
  {
    id: 5,
    name: "Luxury",
    image: "/limousine.jpeg",
    charges: 30,
  },
];

export type { Car };
export default CarsList; 