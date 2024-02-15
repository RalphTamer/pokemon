import { FetchedPokeDetails } from "@/services/indexPage.service"
import { capitalizeFirstLetter } from "@/lib/utils"

import Link from "next/link"
import { useCallback } from "react"
import ImageWrapper from "./ImageWrapper"

type Props = {
  pokemon: FetchedPokeDetails
}
const PokeCard = (props: Props) => {
  const { pokemon } = props
  const defaultSprite = pokemon.sprites.front_default
  const homeSprite = pokemon.sprites.other.home.front_default

  return (
    <Link href={`/pokemon/${pokemon.id}`} className="pokeall">
      <div
        className="pokecard p-1"
        style={{
          borderRadius: "12px",
          boxShadow: "2px 2px 8px #ccc"
        }}
      >
        <ImageWrapper
          src={homeSprite != null ? homeSprite : defaultSprite}
          alt={pokemon.name}
        />

        <div className="px-3">
          <h4>Base exp : {pokemon.base_experience}</h4>
          <h1
            style={{
              fontWeight: "500"
            }}
          >
            {capitalizeFirstLetter(pokemon.name)}
          </h1>
          <div className="flex justify-between">
            <h3>weight : {pokemon.weight}</h3>
            <h3>height : {pokemon.height}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PokeCard
