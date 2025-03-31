import React from "react";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  current,
  total,
  onChange,
}: PaginationProps) {
  const getPages = (): (number | string)[] => {
    if (total <= 10) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 6) return [1, 2, 3, 4, 5, 6, 7, "...", total];
    if (current >= total - 5)
      return [1, "...", ...Array.from({ length: 7 }, (_, i) => total - 6 + i)];
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        className="px-3 py-1 border rounded hover:bg-gray-100 hover:text-black"
        disabled={current === 1}
      >
        ←
      </button>
      {getPages().map((p, idx) => (
        <button
          key={idx}
          onClick={() => typeof p === "number" && onChange(p)}
          className={`px-3 py-1 border rounded hover:bg-gray-100 hover:text-black transition ${
            p === current ? "bg-blue-200 font-bold" : ""
          }`}
          disabled={p === "..."}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        className="px-3 py-1 border rounded hover:bg-gray-100 hover:text-black"
        disabled={current === total}
      >
        →
      </button>
    </div>
  );
}
