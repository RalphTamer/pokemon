"use client"
import { fetchPokemonDetails } from "@/services/pokemonDetailsPage.service"
import { useQuery } from "@tanstack/react-query"
import ImageWrapper from "../UI/ImageWrapper"

import PokemonTypeAndAbilities from "./PokemonTypeAndAbilities"
import { capitalizeFirstLetter } from "@/lib/utils"
import { ApiError } from "@/lib/exceptions"
import { notFound } from "next/navigation"
import { styles } from "@/lib/styles"
import Badge from "../UI/Badge"

type Props = {
  id: string
}
const PokemonDetailsPage = (props: Props) => {
  const { id } = props
  const {
    data: pokemon,
    error,
    isLoading
  } = useQuery({
    queryKey: ["pokemonDetailsPage"],
    queryFn: () => fetchPokemonDetails(id)
  })

  if (pokemon == null) {
    return notFound()
  }
  if (error != null) {
    throw new ApiError(error.message)
  }

  const homeSprite = pokemon.sprites.other.home.front_default
  const defaultSprite = pokemon.sprites.front_default

  return (
    <section className="container">
      <div className="grid grid-cols-2 gap-4 max-md:flex-col">
        <ImageWrapper
          className="col-span-1 max-md:col-span-2"
          src={
            homeSprite != null
              ? homeSprite
              : defaultSprite || "/images/pokeLogo.png"
          }
          alt={pokemon.name}
          styles={{
            background: "#cccccc80",
            boxShadow: "2px 2px 4px #ccc",
            borderRadius: "18px"
          }}
        />
        <div className="flex flex-col space-y-4 col-span-1 max-md:col-span-2">
          <h1
            className="text-center"
            style={{
              fontSize: 32,
              fontWeight: 500
            }}
          >
            {capitalizeFirstLetter(pokemon.name)}
          </h1>
          <div className="flex justify-around  font-bold">
            <h1>weight: {pokemon.weight}</h1>
            <h1>height: {pokemon.height}</h1>
          </div>
          <div className="flex gap-2  items-center">
            <h1 className="font-bold">Types :</h1>
            <div className="flex gap-2">
              {pokemon.types.map(({ type }) => {
                return <Badge key={type.name} text={type.name} />
              })}
            </div>
          </div>
          <div className="flex gap-2  items-center">
            <div className="font-bold">Abilities: </div>
            <div className="flex gap-2 flex-wrap">
              {pokemon.abilities.map(({ ability }) => {
                return (
                  <Badge
                    key={ability.name}
                    text={ability.name}
                    backgroundColor={styles.colors.blue}
                    textColor={styles.colors.yellow}
                  />
                )
              })}
            </div>
          </div>

          <PokemonTypeAndAbilities
            abilities={pokemon.abilities}
            types={pokemon.types}
          />
        </div>
      </div>
    </section>
  )
}

export default PokemonDetailsPage
