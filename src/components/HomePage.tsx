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
  // if there was a search api i would make a search result component
  // and display results on top of the sections under the header
  // but since only 1 search result max it's not worth it

  const { data, error } = useQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => pokeDetails(props.pokeList)
  })

  if (error != null) {
    throw new ApiError(error.message)
  }
  if (data == null) {
    throw new ApiError("Something is wrong from our side")
  }

  return (
    <section className="container">
      {searchData != null && (
        <h1 className="my-4 text-center text-[24px] font-[500]">
          {" "}
          Search Results
        </h1>
      )}
      <RenderPokeCardsGrid
        PokemonDetails={searchData != null ? [searchData] : data}
      />
    </section>
  )
}

export default HomePage
