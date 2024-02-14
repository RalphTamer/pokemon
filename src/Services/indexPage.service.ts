import z from "zod";

export const pokemonsSchema = z.object({
  count: z.number(),
  next: z.null().or(z.string()),
  previous: z.null().or(z.string()),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export type FetchedPokemon = z.infer<typeof pokemonsSchema>;

export type PokeList = Array<{
  name: string;
  url: string;
}>;

export const fetchPoke = async () => {
  const pokeList = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  ).then((res) => res.json());
  const parsedPokeList = pokemonsSchema.parse(pokeList);
  return parsedPokeList;
};

export const pokeDetails = async (pokeList: PokeList) => {
  const pokeDetailsFn = Promise.all(
    pokeList.map(async (pokeDetail) => {
      const res = await fetch(pokeDetail.url);
      return res.json();
    })
  );
  return pokeDetailsFn;
};
