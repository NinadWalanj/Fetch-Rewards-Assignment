import React, { useState } from "react";
import type { SortField } from "../hooks/useDogSearch";
import { useDogSearch } from "../hooks/useDogSearch";
import { useFavorites } from "../hooks/useFavorites";
import Header from "../Components/Header";
import BreedFilter from "../Components/BreedFilter";
import SortControl from "../Components/SortControl";
import PaginationControls from "../Components/PaginationControls";
import DogList from "../Components/DogList";
import FavoritesPanel from "../Components/FavoritesPanel";
import type { Dog } from "../types";
import { api } from "../api";

export default function SearchPage() {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [pageCursor, setPageCursor] = useState<string | undefined>();
  const [matched, setMatched] = useState<Dog | null>(null);

  const { dogs, prevCursor, nextCursor, loading, error } = useDogSearch({
    breeds: selectedBreeds,
    sortField,
    sortDir,
    pageCursor,
  });
  const { favorites, ids: favIds, toggle, remove } = useFavorites();

  const handleMatch = async () => {
    if (!favIds.length) return;
    const { data } = await api.post<{ match: string }>("/dogs/match", favIds);
    const res = await api.post<Dog[]>("/dogs", [data.match]);
    setMatched(res.data[0]);
  };

  const handleListToggle = (id: string) => {
    const d = dogs.find((x) => x.id === id);
    if (d) toggle(d);
  };

  // Bridge FavoritesPanel calls to remove(id)
  const handleFavToggle = (id: string) => remove(id);

  return (
    <div>
      <Header
        onLogout={() => {
          localStorage.removeItem("isLoggedIn");
          window.location.reload();
        }}
      />

      <div style={{ display: "flex", padding: "1rem", gap: "1rem" }}>
        <aside style={{ width: 250 }}>
          <BreedFilter
            selected={selectedBreeds}
            onChange={(bs) => {
              setSelectedBreeds(bs);
              setPageCursor(undefined);
            }}
          />

          <SortControl
            field={sortField}
            direction={sortDir}
            onFieldChange={(f) => {
              setSortField(f);
              setPageCursor(undefined);
            }}
            onDirectionToggle={() => {
              setSortDir((d) => (d === "asc" ? "desc" : "asc"));
              setPageCursor(undefined);
            }}
          />
        </aside>

        <main style={{ flex: 1 }}>
          <PaginationControls
            prevCursor={prevCursor}
            nextCursor={nextCursor}
            onChange={(c) => setPageCursor(c)}
          />

          {loading && <p>Loading…</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <DogList
              dogs={dogs}
              favorites={favIds}
              onToggleFavorite={handleListToggle}
            />
          )}

          <FavoritesPanel
            favorites={favorites}
            onToggleFavorite={handleFavToggle}
            onGenerateMatch={handleMatch}
            matchedDog={matched || undefined}
          />
        </main>
      </div>
    </div>
  );
}
