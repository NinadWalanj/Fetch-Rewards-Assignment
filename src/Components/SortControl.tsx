import React from "react";
import type { SortField } from "../hooks/useDogSearch";

interface SortControlProps {
  field: SortField;
  direction: "asc" | "desc";
  onFieldChange: (f: SortField) => void;
  onDirectionToggle: () => void;
}

export default function SortControl({
  field,
  direction,
  onFieldChange,
  onDirectionToggle,
}: SortControlProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Sort by: </label>
      <select
        value={field}
        onChange={(e) => onFieldChange(e.target.value as SortField)}
        style={{ margin: "0 0.5rem" }}
      >
        <option value="breed">Breed</option>
        <option value="name">Name</option>
        <option value="age">Age</option>
      </select>

      <button onClick={onDirectionToggle}>
        {direction === "asc" ? "A → Z / 0 → 9" : "Z → A / 9 → 0"}
      </button>
    </div>
  );
}
