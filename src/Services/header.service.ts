import { pokeDetailsSchema } from "./indexPage.service"

export const fetchPokemonSearchData = async (searchInput: string | null) => {
  // guard
  if (searchInput == null || searchInput.trim() === "") return null
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
    if (res.ok === false) {
      throw new Error("Failed to fetch data")
    }
    const searchData = await res.json()
    const parsedSearchData = pokeDetailsSchema.parse(searchData)
    return parsedSearchData
  } catch (error) {
    throw new Error("Error fetching data")
  }
}
