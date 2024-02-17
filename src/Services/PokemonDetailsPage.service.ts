import { effect, z } from "zod"
import { pokeDetailsSchema } from "./indexPage.service"
import { ApiError } from "@/lib/exceptions"

export const pokemonAbilitiesSchema = z.object({
  id: z.number(),
  name: z.string(),
  effect_entries: z.array(
    z.object({
      effect: z.string(),
      language: z.object({
        name: z.string(),
        url: z.string()
      }),
      short_effect: z.string()
    })
  )
})
export const pokemonTypesSchema = z.object({
  id: z.number(),
  name: z.string(),
  damage_relations: z.object({
    double_damage_from: z.array(
      z.object({
        name: z.string(),
        url: z.string()
      })
    ),
    double_damage_to: z.array(
      z.object({
        name: z.string(),
        url: z.string()
      })
    ),
    half_damage_from: z.array(
      z.object({
        name: z.string(),
        url: z.string()
      })
    ),
    half_damage_to: z.array(
      z.object({
        name: z.string(),
        url: z.string()
      })
    )
  })
})

export const pokeAbilitiesInfo = async (urls: string[]) => {
  const pokeDetailsFn = Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url)
      const data = await res.json()
      try {
        const parsedPokeAbilities = pokemonAbilitiesSchema.parse(data)

        return parsedPokeAbilities
      } catch (e) {
        throw new ApiError("Zod parsing Error")
      }
    })
  )
  return pokeDetailsFn
}
export const pokeTypesInfo = async (urls: string[]) => {
  const pokeDetailsFn = Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url)
      const data = await res.json()

      const parsedPokemonTypes = pokemonTypesSchema.parse(data)
      return parsedPokemonTypes
    })
  )
  return pokeDetailsFn
}

export const fetchPokemonDetails = async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()
  const parsedPokemon = pokeDetailsSchema.parse(data)

  return parsedPokemon
}
