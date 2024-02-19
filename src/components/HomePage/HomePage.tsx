"use client"

import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"

import RenderPokeCardsGrid from "../RenderPokeCardsGrid"
import HomePagePagination from "./HomePagePagination"
import {
  FetchedPokeDetails,
  FetchedPokemonList,
  fetchPokeDetails
} from "@/services/indexPage.service"
import HomePageFilter from "./HomePageFilter"
import { useGlobalStore } from "@/lib/store"
import { ApiError } from "@/lib/exceptions"

type Props = {
  pokeList: FetchedPokemonList
}

const HomePage = (props: Props) => {
  // since it's only 1 result
  const searchData = useGlobalStore((state) => state.searchResult)
  // if there was a search api i would make a search result component
  // and display results on top of the sections under the header
  // but since only 1 search result max it's not worth it

  const { data: fetchedPokemonsFromQuery, error } = useQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => fetchPokeDetails(props.pokeList.results)
  })

  if (error != null) {
    throw new ApiError(error.message)
  }
  if (fetchedPokemonsFromQuery == null) {
    throw new ApiError("Something is wrong from our side")
  }

  const [fetchedPokemons, setFetchedPokemons] = useState<{
    fetchedPokemonsFromQuery: FetchedPokeDetails[]
    filteredPokemons: null | FetchedPokeDetails[]
  }>({ fetchedPokemonsFromQuery, filteredPokemons: null })

  const pokemonGridRef = useRef<HTMLDivElement | null>(null)

  return (
    <section ref={pokemonGridRef} className="container">
      {/* since poke api makes is so hard to filter , 
      if there's 150 pokemons on specific type
      i have to fetch them all again
       and provides no pagination for pokemons based on type
       i chose to filter on client side 
       but i was limited by the api
       */}
      <HomePageFilter
        fetchedPokemons={fetchedPokemons.fetchedPokemonsFromQuery}
        getFilteredPokemons={(filteredPokemons) => {
          if (filteredPokemons != null) {
            setFetchedPokemons((prev) => {
              return {
                ...prev,
                filteredPokemons
              }
            })
          } else {
            setFetchedPokemons((prev) => {
              return {
                ...prev,
                filteredPokemons: null
              }
            })
          }
        }}
      />
      {searchData != null && (
        <h1 className="my-4 text-center text-[24px] font-[500]">
          {" "}
          Search Results
        </h1>
      )}
      <RenderPokeCardsGrid
        PokemonDetails={
          searchData != null
            ? [searchData]
            : fetchedPokemons.filteredPokemons != null
            ? fetchedPokemons.filteredPokemons
            : fetchedPokemons.fetchedPokemonsFromQuery
        }
      />
      <HomePagePagination
        pokemonsGridRef={pokemonGridRef}
        pokeList={props.pokeList}
        getFetchedPokemons={(fetchedPokemons) => {
          setFetchedPokemons({
            fetchedPokemonsFromQuery: fetchedPokemons,
            filteredPokemons: null
          })
        }}
      />
    </section>
  )
}

export default HomePage
