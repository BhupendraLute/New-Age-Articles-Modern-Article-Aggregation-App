"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2 mt-6">
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-lg px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        Search
      </button>
    </form>
  );
};
