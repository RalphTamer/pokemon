import { FetchedPokeDetails } from "@/services/indexPage.service"
import PokeCard from "./UI/PokeCard"

type Props = {
  PokemonDetails: Array<FetchedPokeDetails>
}
const RenderPokeCardsGrid = (props: Props) => {
  const { PokemonDetails } = props
  return (
    <div className="grid grid-cols-12 gap-12 ">
      {PokemonDetails.map((pokemon) => {
        return (
          <div key={pokemon.id} className="col-span-3 ">
            <PokeCard pokemon={pokemon} />
          </div>
        )
      })}
    </div>
  )
}

export default RenderPokeCardsGrid
