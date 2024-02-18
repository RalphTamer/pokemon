import { fetchPokemonDetails } from "@/services/pokemonDetailsPage.service"
import PokemonDetailsPage from "@/components/PokemonDetails/PokemonDetailsPage"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from "@tanstack/react-query"

const PokemonDetails = async ({
  params
}: {
  params: {
    id: string
  }
}) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["pokemonDetailsPage"],
    queryFn: () => fetchPokemonDetails(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetailsPage id={params.id} />
    </HydrationBoundary>
  )
}

export default PokemonDetails
