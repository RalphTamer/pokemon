import { useQuery } from "@tanstack/react-query"

import { ApiError } from "@/lib/exceptions"
import {
  FetchedPokeDetails,
  fetchPokemonTypes,
  filterPokemons
} from "@/services/indexPage.service"
import Button from "../UI/Button"

type Props = {
  fetchedPokemons: FetchedPokeDetails[]
  getFilteredPokemons: (filteredPokemons: FetchedPokeDetails[] | null) => void
}
const HomePageFilter = (props: Props) => {
  const { data: fetchedTypesFromQuery, error } = useQuery({
    queryKey: ["types"],
    queryFn: () => fetchPokemonTypes()
  })
  if (error != null) {
    throw new ApiError(error.message)
  }
  if (fetchedTypesFromQuery == null) {
    throw new ApiError("Something is wrong from our side")
  }

  const { fetchedPokemons } = props

  return (
    <div className="my-16 flex space-x-2 items-center">
      <h1>Filter on this page: </h1>

      <select
        style={{
          background: "#CCC",
          outline: "none",
          borderRadius: 12
        }}
        className="py-2"
        name="select filter"
        aria-label="filter by"
        onChange={(e) => {
          const filterValue = e.target.value

          if (filterValue === "all") return props.getFilteredPokemons(null)

          props.getFilteredPokemons(
            filterPokemons({
              pokemons: fetchedPokemons,
              filterValue: filterValue
            })
          )
        }}
      >
        <option label={"all"} value="all">
          All
        </option>
        {fetchedTypesFromQuery.results.map((type) => {
          return (
            <option label={type.name} key={type.name} value={type.name}>
              {type.name}
            </option>
          )
        })}
      </select>
      <Button
        name="clear filters"
        onClick={() => {
          props.getFilteredPokemons(null)
        }}
      >
        clear filters
      </Button>
    </div>
  )
}

export default HomePageFilter
