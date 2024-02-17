import { ApiError } from "@/lib/exceptions"
import {
  pokemonAbilitiesSchema,
  pokeAbilitiesInfo
} from "@/services/PokemonDetailsPage.service"
import { FetchedPokeDetails } from "@/services/indexPage.service"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import Skeleton from "react-loading-skeleton"
import PokemonAbilities from "./PokemonAbilities"
import PokemonTypes from "./PokemonTypes"

type Props = {
  abilities: Pick<FetchedPokeDetails, "abilities">["abilities"]
  types: Pick<FetchedPokeDetails, "types">["types"]
}

const MorePokemonDetails = (props: Props) => {
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

export default MorePokemonDetails
