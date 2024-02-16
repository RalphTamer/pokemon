"use client"

import { useDebounce } from "@/hooks/useDebounce"
// import useDebounce from "@/hooks/useDebounce"
import { useGlobalStore } from "@/lib/store"
import { pokeDetailsSchema } from "@/services/indexPage.service"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import { useRouter } from "next/navigation"

import { useEffect, useMemo, useState } from "react"

const fetchPokemonSearchData = async (searchInput: string | null) => {
  // guard
  if (searchInput == null || searchInput.trim() === "") return null
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
    if (res.ok === false) {
      throw new Error("Failed to fetch data")
    }
    const searchData = await res.json()
    const parsedSearchData = pokeDetailsSchema.parse(searchData)
    return parsedSearchData
  } catch (error) {
    throw new Error("Error fetching data")
  }
}

const SearchBar = () => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState<string | null>(null)

  //   const debouncedSearchInput = useDebounce(searchInput, 300)

  const queryKey = useMemo(() => ["search", searchInput], [searchInput])

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchPokemonSearchData(searchInput)
  })
  //   const datas = useMemo(() => data, [])
  console.log(data)

  useEffect(() => {
    if (data != null) {
      useGlobalStore.setState({
        searchResult: data
      })
    } else {
      useGlobalStore.setState({
        searchResult: null
      })
    }
  }, [data])

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
      <div
        className=" bg-[#FFDE00] px-1"
        style={{
          borderRadius: 18
        }}
      >
        <input
          value={searchInput != null ? searchInput : ""}
          onChange={async (e) => {
            setSearchInput(e.target.value)
          }}
          type="text"
          className="px-2 py-2"
          style={{ background: "transparent", outline: "none" }}
          placeholder="Search a pokemon"
        />
        <button
          type="submit"
          className="bg-[#CC0000] py-1 px-4 text-white font-[500]"
          style={{ borderRadius: 18 }}
        >
          {isLoading === true ? "loading" : "search"}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
