import { FetchedPokeDetails } from "@/services/indexPage.service"
import { capitalizeFirstLetter } from "@/lib/utils"

import Link from "next/link"
import React from "react"
import ImageWrapper from "./ImageWrapper"

type Props = {
  pokemon: FetchedPokeDetails
}
const PokeCard = (props: Props) => {
  const { pokemon } = props
  const defaultSprite = pokemon.sprites.front_default
  const homeSprite = pokemon.sprites.other.home.front_default
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div
        className="hover:translate-y-[-5%] hover:rotate-2 p-1"
        style={{
          borderRadius: "12px",
          boxShadow: "2px 2px 8px #ccc",
          background: "rgb(239 239 237)",
          transition: "all ease-in-out .2s ",
          opacity: 1
        }}
      >
        <ImageWrapper
          src={
            homeSprite != null
              ? homeSprite
              : defaultSprite || "/images/pokeLogo.png"
          }
          alt={pokemon.name}
        />

        <div className="px-3">
          <p>Base exp : {pokemon.base_experience}</p>
          <h1
            style={{
              fontWeight: "500"
            }}
          >
            {capitalizeFirstLetter(pokemon.name)}
          </h1>
          <div className="flex justify-between">
            <p>weight : {pokemon.weight}</p>
            <p>height : {pokemon.height}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default React.memo(PokeCard)
