import {
  fetchPoke,
  fetchPokeDetails,
  fetchPokemonTypes
} from "@/services/indexPage.service"
import HomePage from "@/components/HomePage/HomePage"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query"

export default async function Home() {
  const queryClient = new QueryClient()

  const pokeList = await fetchPoke()

  await queryClient.prefetchQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => fetchPokeDetails(pokeList.results)
  })
  await queryClient.prefetchQuery({
    queryKey: ["types"],
    queryFn: () => fetchPokemonTypes()
  })

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePage pokeList={pokeList} />
      </HydrationBoundary>
    </main>
  )
}
