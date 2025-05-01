import React from "react";
import DogCard from "./DogCard";
import { Dog } from "../types";

interface DogListProps {
  dogs: Dog[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function DogList({
  dogs,
  favorites,
  onToggleFavorite,
}: DogListProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
      }}
    >
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          isFavorite={favorites.includes(dog.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
