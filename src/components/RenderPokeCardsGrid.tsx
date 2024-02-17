import { FetchedPokeDetails } from "@/services/indexPage.service"
import PokeCard from "./UI/PokeCard"

type Props = {
  PokemonDetails: Array<FetchedPokeDetails>
}

const RenderPokeCardsGrid = (props: Props) => {
  const { PokemonDetails } = props
  return (
    <div className="grid grid-cols-12 lg:gap-12 gap-4">
      {PokemonDetails.map((pokemon) => {
        return (
          <div
            key={pokemon.id}
            className="col-span-12 xl:col-span-3 lg:col-span-4 sm:col-span-6"
          >
            <PokeCard pokemon={pokemon} />
          </div>
        )
      })}
    </div>
  )
}

export default RenderPokeCardsGrid
