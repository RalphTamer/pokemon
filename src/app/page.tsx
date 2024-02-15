import { fetchPoke, pokeDetails } from "@/services/indexPage.service";
import HomePage from "@/components/HomePage";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  const pokeList = (await fetchPoke()).results;

  await queryClient.prefetchQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => pokeDetails(pokeList),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePage pokeList={pokeList} />
      </HydrationBoundary>
    </main>
  );
}
