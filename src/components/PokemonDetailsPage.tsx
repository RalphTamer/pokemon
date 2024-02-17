"use client"
import { fetchPokemonDetails } from "@/services/PokemonDetailsPage.service"
import { useQuery } from "@tanstack/react-query"
import ImageWrapper from "./UI/ImageWrapper"

import { capitalizeFirstLetter } from "@/lib/utils"
import Badge from "./UI/Badge"
import { redirect } from "next/dist/server/api-utils"
import { notFound } from "next/navigation"
import { ApiError } from "@/lib/exceptions"

type Props = {
  id: string
}
const PokemonDetailsPage = (props: Props) => {
  const { id } = props
  const { data, error } = useQuery({
    queryKey: ["pokemonDetailsPage"],
    queryFn: () => fetchPokemonDetails(id)
  })
  if (data == null) {
    return notFound()
  } else if (error != null) {
    throw new ApiError(error.message)
  }
  const homeSprite = data.sprites.other.home.front_default
  const defaultSprite = data.sprites.front_default

  return (
    <section className="container">
      <div className="flex gap-4 max-md:flex-col">
        <ImageWrapper
          className="w-1/2 max-md:w-full"
          src={homeSprite != null ? homeSprite : defaultSprite}
          alt={data.name}
          styles={{
            background: "#cccccc80",
            boxShadow: "2px 2px 4px #ccc",
            borderRadius: "18px"
          }}
        />
        <div className="flex flex-col space-y-4 w-1/2 max-md:w-full">
          <h1
            className="text-center"
            style={{
              fontSize: 32,
              fontWeight: 500
            }}
          >
            {capitalizeFirstLetter(data.name)}
          </h1>
          <div className="flex justify-around  font-bold">
            <h1>weight: {data.weight}</h1>
            <h1>height: {data.height}</h1>
          </div>
          <div className="flex gap-2  items-center">
            <h1 className="font-bold">Types :</h1>
            <div className="flex gap-2">
              {data.types.map(({ type }) => {
                return <Badge key={type.name} text={type.name} />
              })}
            </div>
          </div>
          <div className="flex gap-2  items-center">
            <div className="font-bold">Abilities: </div>
            <div className="flex gap-2 flex-wrap">
              {data.abilities.map(({ ability }) => {
                return (
                  <Badge
                    key={ability.name}
                    text={ability.name}
                    backgroundColor="#3B4CCA"
                    textColor="#FFDE00"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PokemonDetailsPage
