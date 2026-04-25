import CatalogClient from "@/components/CatalogClient/CatalogClient";
import { getAll } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["campers", {}],
    queryFn: () => getAll(1),
    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}

export default page;
