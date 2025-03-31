import React from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Поиск рецептов..."
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
