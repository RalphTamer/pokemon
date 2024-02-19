import { pokeTypesInfo } from "@/services/pokemonDetailsPage.service"
import { capitalizeFirstLetter, humanize } from "@/lib/utils"
import CollapsibleItem from "../UI/CollapsibleItem"
import { useQuery } from "@tanstack/react-query"
import Skeleton from "react-loading-skeleton"
import { ApiError } from "@/lib/exceptions"
import { styles } from "@/lib/styles"

type Props = {
  typesUrls: string[]
}
const PokemonTypes = (props: Props) => {
  const { typesUrls } = props
  const {
    data: pokemonTypesData,
    isLoading,
    error
  } = useQuery({
    queryKey: ["detailsPagetypes"],
    queryFn: () => pokeTypesInfo(typesUrls)
  })

  if (error != null) {
    throw new ApiError(error.message)
  }

  if (isLoading) {
    return <Skeleton count={4} />
  }
  if (pokemonTypesData == null) {
    return <h1>No additional details found</h1>
  }

  return (
    <div>
      {pokemonTypesData.map((type) => {
        return (
          <CollapsibleItem
            key={type.id}
            title={capitalizeFirstLetter(type.name) + " Type"}
          >
            <div>
              {Object.entries(type.damage_relations).map(([key, value]) => {
                const typedKey = key as keyof typeof type.damage_relations
                // guard
                if (value[0] == null) return
                return (
                  <div key={typedKey}>
                    <span
                      style={{
                        color: styles.colors.blue,
                        fontWeight: 600
                      }}
                    >
                      {humanize(typedKey)}:{" "}
                    </span>
                    <span>
                      {value.map((v, idx) => {
                        const name =
                          idx + 1 === value.length
                            ? capitalizeFirstLetter(v.name)
                            : capitalizeFirstLetter(v.name) + ", "
                        return name
                      })}
                    </span>
                  </div>
                )
              })}
            </div>
          </CollapsibleItem>
        )
      })}
    </div>
  )
}

export default PokemonTypes
