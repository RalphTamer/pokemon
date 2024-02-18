import { FetchedPokeDetails } from "@/services/indexPage.service"
import { useMemo } from "react"
import PokemonAbilities from "./PokemonAbilities"
import PokemonTypes from "./PokemonTypes"

type Props = {
  abilities: Pick<FetchedPokeDetails, "abilities">["abilities"]
  types: Pick<FetchedPokeDetails, "types">["types"]
}

const PokemonTypeAndAbilities = (props: Props) => {
  const abilitiesUrls = useMemo(
    () => props.abilities.map(({ ability }) => ability.url),
    [props.abilities]
  )

  const typesUrls = useMemo(
    () => props.types.map(({ type }) => type.url),
    [props.abilities]
  )

  // console.log("render")

  return (
    <div className="">
      <PokemonAbilities abilitiesUrls={abilitiesUrls} />
      <PokemonTypes typesUrls={typesUrls} />
    </div>
  )
}

export default PokemonTypeAndAbilities
