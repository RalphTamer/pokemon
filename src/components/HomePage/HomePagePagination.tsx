"use client"
import {
  FetchedPokemonList,
  FetchedPokeDetails,
  fetchPoke,
  fetchPokeDetails,
  pokemonLimitPerPage
} from "@/services/indexPage.service"
import { MutableRefObject, useCallback, useRef, useState } from "react"
import SVGIcon from "../UI/SVGIcon"
import ActivityIndicator from "../UI/ActivityIndicator"
import { styles } from "@/lib/styles"

type Props = {
  pokeList: FetchedPokemonList
  getFetchedPokemons: (fetchedPokemons: FetchedPokeDetails[]) => void
  pokemonsGridRef: MutableRefObject<HTMLDivElement | null>
}
const HomePagePagination = (props: Props) => {
  const [fetchedPokemonInfo, setFetchedPokemonInfo] = useState<{
    fetchedPokemonList: FetchedPokemonList
    pokemonPageOffset: number
  }>({
    fetchedPokemonList: props.pokeList,
    pokemonPageOffset: 0
  })

  const [isloading, setIsLoading] = useState<boolean>(false)

  const paginationButtonHandlerCb = useCallback(
    async (args: { nextOrPrevPageUrl: string; offsetIncrement: boolean }) => {
      setIsLoading(true)
      const pageList = await fetchPoke(args.nextOrPrevPageUrl)
      console.log(pageList)

      const nextPageData = await fetchPokeDetails(pageList.results)
      setFetchedPokemonInfo((prev) => {
        return {
          fetchedPokemonList: pageList,
          pokemonPageOffset:
            args.offsetIncrement === true
              ? prev.pokemonPageOffset + pokemonLimitPerPage
              : prev.pokemonPageOffset - pokemonLimitPerPage
        }
      })
      props.getFetchedPokemons(nextPageData)
      setIsLoading(false)
      if (props.pokemonsGridRef != null) {
        props.pokemonsGridRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      }
    },
    [props]
  )
  return (
    <div className="flex gap-4 justify-center items-center my-8">
      <button
        aria-label="chevron left"
        disabled={
          isloading === true ||
          fetchedPokemonInfo.fetchedPokemonList.previous == null
        }
        className="relative p-4 disabled:cursor-not-allowed"
        style={{
          borderRadius: "50%",
          background:
            isloading === true ||
            fetchedPokemonInfo.fetchedPokemonList.previous == null
              ? "#ccc"
              : styles.colors.yellow
        }}
        onClick={async () => {
          if (fetchedPokemonInfo.fetchedPokemonList.previous != null) {
            paginationButtonHandlerCb({
              nextOrPrevPageUrl: fetchedPokemonInfo.fetchedPokemonList.previous,
              offsetIncrement: false
            })
          }
        }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            transform: "translate(-50%,-50%)"
          }}
        >
          <SVGIcon
            name="chevron-left"
            color={styles.colors.blue}
            strokeWidth={2.5}
          />
        </div>
      </button>
      <div
        className="px-8 py-4 relative"
        style={{
          background: styles.colors.blue,
          borderRadius: 12
        }}
      >
        {isloading === true ? (
          <ActivityIndicator
            color={styles.colors.yellow}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: "translate(-50%,-50%)"
            }}
          />
        ) : (
          <h1
            className="absolute top-1/2 left-1/2"
            style={{
              transform: "translate(-50%,-50%)",
              color: styles.colors.yellow,
              fontWeight: 500
            }}
          >
            {(props.pokeList.count -
              (props.pokeList.count -
                (pokemonLimitPerPage + fetchedPokemonInfo.pokemonPageOffset))) /
              pokemonLimitPerPage}
            /{Math.ceil(props.pokeList.count / pokemonLimitPerPage)}
          </h1>
        )}
      </div>

      <button
        aria-label="chevron right"
        disabled={
          isloading === true ||
          fetchedPokemonInfo.fetchedPokemonList.next == null
        }
        className="relative p-4 disabled:cursor-not-allowed"
        style={{
          borderRadius: "50%",
          background:
            isloading === true ||
            fetchedPokemonInfo.fetchedPokemonList.next == null
              ? "#ccc"
              : styles.colors.yellow
        }}
        onClick={async () => {
          if (fetchedPokemonInfo.fetchedPokemonList.next != null) {
            paginationButtonHandlerCb({
              nextOrPrevPageUrl: fetchedPokemonInfo.fetchedPokemonList.next,
              offsetIncrement: true
            })
          }
        }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            transform: "translate(-50%,-50%)"
          }}
        >
          <SVGIcon
            name="chevron-right"
            color={styles.colors.blue}
            strokeWidth={2.5}
          />
        </div>
      </button>
    </div>
  )
}

export default HomePagePagination
