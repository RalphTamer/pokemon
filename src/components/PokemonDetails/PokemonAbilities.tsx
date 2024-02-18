"use client"
import { useQuery } from "@tanstack/react-query"
import Skeleton from "react-loading-skeleton"

import { pokeAbilitiesInfo } from "@/services/PokemonDetailsPage.service"
import { ApiError } from "@/lib/exceptions"
import CollapsibleItem from "../UI/CollapsibleItem"
import { capitalizeFirstLetter } from "@/lib/utils"
import { styles } from "@/lib/styles"

type Props = {
  abilitiesUrls: Array<string>
}
const PokemonAbilities = (props: Props) => {
  const { abilitiesUrls } = props
  const { data, isLoading, error } = useQuery({
    queryKey: ["abilities"],
    queryFn: () => pokeAbilitiesInfo(abilitiesUrls)
  })
  // console.log(data)
  if (error != null) {
    throw new ApiError(error.message)
  }
  if (isLoading) {
    return <Skeleton count={10} />
  }
  if (data == null) {
    return <h1>No additional details found</h1>
  }

  return (
    <div>
      {data.map((ability) => {
        return (
          <CollapsibleItem
            title={capitalizeFirstLetter(ability.name) + " Effect"}
            key={ability.id}
          >
            <div key={ability.id}>
              {
                ability.effect_entries.find(
                  (effect) => effect.language.name === "en"
                )?.effect
              }
            </div>
            <div>
              <span
                className="font-[600] "
                style={{
                  color: styles.colors.blue
                }}
              >
                short effect:{" "}
              </span>
              <span>
                {
                  ability.effect_entries.find(
                    (effect) => effect.language.name === "en"
                  )?.short_effect
                }
              </span>
            </div>
          </CollapsibleItem>
        )
      })}
    </div>
  )
}

export default PokemonAbilities