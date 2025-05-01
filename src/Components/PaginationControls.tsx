interface PaginationControlsProps {
  prevCursor?: string;
  nextCursor?: string;
  onChange: (cursor: string) => void;
}

export default function PaginationControls({
  prevCursor,
  nextCursor,
  onChange,
}: PaginationControlsProps) {
  return (
    <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
      <button
        disabled={!prevCursor}
        onClick={() => prevCursor && onChange(prevCursor)}
      >
        Prev
      </button>
      <button
        disabled={!nextCursor}
        onClick={() => nextCursor && onChange(nextCursor)}
      >
        Next
      </button>
    </div>
  );
}
