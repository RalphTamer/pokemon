"use client"

import { PokeList, pokeDetails } from "@/services/indexPage.service"
import { useQuery } from "@tanstack/react-query"
import RenderPokeCardsGrid from "./RenderPokeCardsGrid"
import { useGlobalStore } from "@/lib/store"

type Props = {
  pokeList: PokeList
}
const HomePage = (props: Props) => {
  const searchData = useGlobalStore((state) => state.searchResult)
  const { data, error } = useQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => pokeDetails(props.pokeList)
  })
  if (data == null) {
    console.log("data is null")

    return <></>
  }

  return (
    <section className="container px-[200px] ">
      <RenderPokeCardsGrid
        PokemonDetails={searchData != null ? [searchData] : data}
      />
    </section>
  )
}

export default HomePage
