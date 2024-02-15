"use client"
import { fetchPokemonDetails } from "@/services/PokemonDetailsPage.service"
import { useQuery } from "@tanstack/react-query"
import ImageWrapper from "./UI/ImageWrapper"
import { capitalizeFirstLetter } from "@/lib/utils"
import Badge from "./UI/Badge"

type Props = {
  id: string
}
const PokemonDetailsPage = (props: Props) => {
  const { id } = props
  const { data, error } = useQuery({
    queryKey: ["pokemonDetailsPage"],
    queryFn: () => fetchPokemonDetails(id)
  })
  if (data == null) {
    return <></>
  }
  const homeSprite = data.sprites.other.home.front_default
  const defaultSprite = data.sprites.front_default

  console.log(data)

  return (
    <section className="container px-[200px] my-12">
      <div className="grid grid-cols-2 gap-4">
        <ImageWrapper
          src={homeSprite != null ? homeSprite : defaultSprite}
          alt={data.name}
          styles={{
            background: "#cccccc80",
            boxShadow: "2px 2px 4px #ccc",
            borderRadius: "18px"
          }}
        />
        <div className="flex flex-col space-y-4">
          <h1
            className="text-center"
            style={{
              fontSize: 32,
              fontWeight: 500
            }}
          >
            {capitalizeFirstLetter(data.name)}
          </h1>
          <div className="flex justify-around  font-bold">
            <h1>weight: {data.weight}</h1>
            <h1>height: {data.height}</h1>
          </div>
          <div className="flex gap-2  items-center">
            <h1 className="font-bold">Types :</h1>
            <div className="flex gap-2">
              {data.types.map(({ type }) => {
                return <Badge key={type.name} text={type.name} style={{}} />
              })}
            </div>
          </div>
          <div className="flex gap-2  items-center">
            <div className="font-bold">Abilities: </div>
            <div className="flex gap-2">
              {data.abilities.map(({ ability }) => {
                return (
                  <Badge
                    key={ability.name}
                    text={ability.name}
                    style={{
                      background: "#3B4CCA",
                      color: "#FFDE00"
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PokemonDetailsPage
