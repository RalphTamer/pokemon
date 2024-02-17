import z from "zod"

export const pokemonsSchema = z.object({
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
export type FetchedPokemon = z.infer<typeof pokemonsSchema>

export const pokeDetailsSchema = z.object({
  name: z.string(),
  id: z.number(),
  base_experience: z.number(),
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
    front_default: z.string(),
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

export type PokeList = Pick<FetchedPokemon, "results">["results"]

export const fetchPoke = async () => {
  const pokeList = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  ).then((res) => res.json())
  const parsedPokeList = pokemonsSchema.parse(pokeList)
  return parsedPokeList
}

export const pokeDetails = async (pokeList: PokeList) => {
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
