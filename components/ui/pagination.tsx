"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <Button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};
