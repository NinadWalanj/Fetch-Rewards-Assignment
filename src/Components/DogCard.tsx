import React from "react";
import { Dog } from "../types";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function DogCard({
  dog,
  isFavorite,
  onToggleFavorite,
}: DogCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: 8 }}>
      <img
        src={dog.img}
        alt={dog.name}
        style={{ width: "100%", height: 150, objectFit: "cover" }}
      />
      <h3>{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Zip: {dog.zip_code}</p>
      <button
        onClick={() => onToggleFavorite(dog.id)}
        style={{ fontSize: "1.25rem" }}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}
