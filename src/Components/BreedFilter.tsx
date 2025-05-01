import React, { useEffect, useState } from "react";
import { api } from "../api";

interface BreedFilterProps {
  selected: string[];
  onChange: (breeds: string[]) => void;
}

export default function BreedFilter({ selected, onChange }: BreedFilterProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get<string[]>("/dogs/breeds")
      .then((res) => setOptions(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    onChange(values);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Breed:</label>
      {loading ? (
        <p>Loading breeds...</p>
      ) : (
        <select
          multiple
          value={selected}
          onChange={handleSelect}
          style={{ width: "100%", height: 100 }}
        >
          {options.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
