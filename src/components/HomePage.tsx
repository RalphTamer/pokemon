"use client"

import {
  FetchedPokeDetails,
  FetchedPokemonList,
  PokeList,
  fetchPoke,
  fetchPokeDetails,
  pokemonLimitPerPage
} from "@/services/indexPage.service"
import { useQuery } from "@tanstack/react-query"
import RenderPokeCardsGrid from "./RenderPokeCardsGrid"
import { useGlobalStore } from "@/lib/store"
import { ApiError } from "@/lib/exceptions"
import { useState } from "react"
import HomePagePagination from "./HomePagePagination"

type Props = {
  pokeList: FetchedPokemonList
}
const HomePage = (props: Props) => {
  // since it's only 1 result
  const searchData = useGlobalStore((state) => state.searchResult)
  // if there was a search api i would make a search result component
  // and display results on top of the sections under the header
  // but since only 1 search result max it's not worth it

  const { data, error } = useQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => fetchPokeDetails(props.pokeList.results)
  })

  if (error != null) {
    throw new ApiError(error.message)
  }
  if (data == null) {
    throw new ApiError("Something is wrong from our side")
  }

  const [fetchedPokemons, setFetchedPokemons] =
    useState<FetchedPokeDetails[]>(data)

  console.log("render")
  // console.log(pokemonPageOffset)

  return (
    <section className="container">
      <HomePagePagination
        pokeList={props.pokeList}
        getFetchedPokemons={(fetchedPokemons) => {
          setFetchedPokemons(fetchedPokemons)
        }}
      />
      {searchData != null && (
        <h1 className="my-4 text-center text-[24px] font-[500]">
          {" "}
          Search Results
        </h1>
      )}
      <RenderPokeCardsGrid
        PokemonDetails={searchData != null ? [searchData] : fetchedPokemons}
      />
    </section>
  )
}

export default HomePage
