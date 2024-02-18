import z from "zod"

export const listSchema = z.object({
  count: z.number(),
  next: z.null().or(z.string()),
  previous: z.null().or(z.string()),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string()
    })
  )
})
export type FetchedPokemonList = z.infer<typeof listSchema>

export const pokeDetailsSchema = z.object({
  name: z.string(),
  id: z.number(),
  base_experience: z.nullable(z.number()),
  weight: z.number(),
  height: z.number(),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string()
      }),
      is_hidden: z.boolean(),
      slot: z.number()
    })
  ),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string(),
        url: z.string()
      })
    })
  ),
  sprites: z.object({
    front_default: z.nullable(z.string()),
    back_default: z.nullable(z.string()),
    back_female: z.nullable(z.string()),
    back_shiny: z.nullable(z.string()),
    back_shiny_female: z.nullable(z.string()),
    front_female: z.nullable(z.string()),
    front_shiny: z.nullable(z.string()),
    front_shiny_female: z.nullable(z.string()),
    other: z.object({
      home: z.object({
        front_default: z.nullable(z.string())
      })
    })
  })
})

export type FetchedPokeDetails = z.infer<typeof pokeDetailsSchema>

export type PokeList = Pick<FetchedPokemonList, "results">["results"]

export const pokemonLimitPerPage = 20
export const filterPokemons = (args: {
  pokemons: FetchedPokeDetails[]
  filterValue: string
}) => {
  const filtered = args.pokemons.filter((pokemon) =>
    pokemon.types.some((pokeType) => pokeType.type.name === args.filterValue)
  )
  return filtered
}

export const fetchPoke = async (PokeListurl?: string) => {
  const url =
    PokeListurl ||
    `https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimitPerPage}&offset=0`
  const pokeList = await fetch(url).then((res) => res.json())
  const parsedPokeList = listSchema.parse(pokeList)
  return parsedPokeList
}

export const fetchPokeDetails = async (pokeList: PokeList) => {
  const pokeDetailsFn = Promise.all(
    pokeList.map(async (pokeDetail) => {
      const res = await fetch(pokeDetail.url)
      const data = await res.json()

      const parsedPokeDetails = pokeDetailsSchema.parse(data)

      return parsedPokeDetails
    })
  )
  return pokeDetailsFn
}

export const fetchPokemonTypes = async () => {
  const data = await fetch("https://pokeapi.co/api/v2/type")
  const typesList = await data.json()
  const parsedTypesList = listSchema.parse(typesList)
  return parsedTypesList
}
