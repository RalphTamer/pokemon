"use client"

import { PokeList, pokeDetails } from "@/services/indexPage.service"
import { useQuery } from "@tanstack/react-query"
import RenderPokeCardsGrid from "./RenderPokeCardsGrid"
import { useGlobalStore } from "@/lib/store"
import { ApiError } from "@/lib/exceptions"

type Props = {
  pokeList: PokeList
}
const HomePage = (props: Props) => {
  // since it's only 1 result
  const searchData = useGlobalStore((state) => state.searchResult)

  const { data, error } = useQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => pokeDetails(props.pokeList)
  })

  if (error != null) {
    throw new ApiError(error.message)
  } else if (data == null) {
    throw new ApiError("Something is wrong from our side")
  }

  return (
    <section className="container">
      <RenderPokeCardsGrid
        PokemonDetails={searchData != null ? [searchData] : data}
      />
    </section>
  )
}

export default HomePage
