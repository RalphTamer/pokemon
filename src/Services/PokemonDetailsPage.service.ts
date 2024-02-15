import { pokeDetailsSchema } from "./indexPage.service"

export const fetchPokemonDetails = async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()
  const parsedPokemon = pokeDetailsSchema.parse(data)

  return parsedPokemon
}
