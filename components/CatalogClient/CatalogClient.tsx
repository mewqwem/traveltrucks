"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import TrucksList from "@/components/TrucksList/TrucksList";
import { getAll } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

function CatalogClient() {
  const searchParams = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) => getAll(pageParam, filters),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.campers.length === 4 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const allCampers = data?.pages.flatMap((page) => page.campers) || [];

  if (isError) {
    return (
      <section className="catalogSection">
        <SearchBar />
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
          Error loading campers:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </section>
    );
  }

  return (
    <section className="catalogSection">
      <SearchBar />
      <TrucksList
        fetchNextPage={fetchNextPage}
        campers={allCampers}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </section>
  );
}

export default CatalogClient;
