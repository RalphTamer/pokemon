"use client"
// TODO : CLEANUP

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import _ from "lodash"

import { fetchPokemonSearchData } from "@/services/header.service"
import ActivityIndicator from "./UI/ActivityIndicator"
import { useGlobalStore } from "@/lib/store"
import SVGIcon from "./UI/SVGIcon"
import { styles } from "@/lib/styles"

const SearchBar = () => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const debouncedHandleChange = useMemo(() => {
    return _.debounce(async (value) => {
      try {
        setIsLoading(true)
        // not the best practice since its not cached
        // should use react query
        // i am a react query newbie , its a headache with debounce
        const searchData = await fetchPokemonSearchData(value)

        if (searchData != null) {
          useGlobalStore.setState({
            searchResult: searchData,
            errorMessage: null
          })
        } else {
          useGlobalStore.setState({
            searchResult: null,
            errorMessage: null
          })
        }
        setIsLoading(false)
      } catch (e) {
        // not throwing the error because it's expected
        // since Pokeapi have no search api i had to query the get by id or name
        setIsLoading(false)
        useGlobalStore.setState({
          errorMessage: `No Results found for ${value}`
        })
      }
    }, 800)
  }, [])

  return (
    <form
      id="searchForm"
      name="searchForm"
      onSubmit={(e) => {
        e.preventDefault()
        router.push(`/pokemon/${searchInput}`)
      }}
      className="py-4 flex justify-center items-center "
    >
      {searchInput != null && searchInput != "" && (
        <button
          type="button"
          className="relative"
          onClick={() => {
            setSearchInput(null)
            useGlobalStore.setState({
              searchResult: null,
              errorMessage: null
            })
          }}
        >
          <SVGIcon name="x" color="white" strokeWidth={2} />
        </button>
      )}
      <div
        className={` px-2  flex items-center py-1`}
        style={{
          borderRadius: 18,
          background: styles.colors.yellow
        }}
      >
        <input
          value={searchInput != null ? searchInput : ""}
          onChange={(e) => {
            setSearchInput(e.target.value)
            debouncedHandleChange(e.target.value)
          }}
          type="text"
          className="placeholder:text-[#1c1d1d] placeholder:font-[500]"
          style={{ background: "transparent", outline: "none" }}
          placeholder="Search a pokemon"
        />
        <button
          type="submit"
          className="bg-[#CC0000] px-8 py-4 text-white font-[500] relative"
          style={{ borderRadius: 18 }}
        >
          {isLoading === true ? (
            <div
              // avoid shifting
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
              }}
            >
              <ActivityIndicator color={styles.colors.yellow} />
            </div>
          ) : (
            <div
              // avoid shifting
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)"
              }}
            >
              <SVGIcon
                name="search"
                color="white"
                size={22}
                strokeWidth={2.5}
              />
            </div>
          )}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
