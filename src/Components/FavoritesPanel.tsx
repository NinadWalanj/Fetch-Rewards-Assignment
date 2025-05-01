import { Dog } from "../types";
import DogCard from "./DogCard";

interface FavoritesPanelProps {
  favorites: Dog[];
  onToggleFavorite: (id: string) => void;
  onGenerateMatch: () => void;
  matchedDog?: Dog;
}

export default function FavoritesPanel({
  favorites,
  onToggleFavorite,
  onGenerateMatch,
  matchedDog,
}: FavoritesPanelProps) {
  return (
    <div className="favorites-panel">
      <h2>Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorites selected.</p>
      ) : (
        <>
          <div className="dog-grid">
            {favorites.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(dog.id)}
              />
            ))}
          </div>

          <button
            onClick={onGenerateMatch}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            Generate Match
          </button>
        </>
      )}

      {matchedDog && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Your Match:</h3>
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            <DogCard
              dog={matchedDog}
              isFavorite={false}
              onToggleFavorite={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
