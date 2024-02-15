"use client"

import { PokeList, pokeDetails } from "@/services/indexPage.service"
import { useQuery } from "@tanstack/react-query"
import PokeCard from "./UI/PokeCard"

type Props = {
  pokeList: PokeList
}
const HomePage = (props: Props) => {
  const { data, error } = useQuery({
    queryKey: ["pokeDetails"],
    queryFn: () => pokeDetails(props.pokeList)
  })
  if (data == null) {
    console.log("data is null")

    return <></>
  }

  return (
    <section className="container lg:px-[200px] px-[50px]">
      <div className="grid grid-cols-12 md:gap-12 gap-4">
        {data.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              className="md:col-span-4 lg:col-span-3 col-span-6 mx-auto"
            >
              <PokeCard pokemon={pokemon} />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HomePage
