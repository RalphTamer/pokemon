"use client"

import { useQuery } from "@tanstack/react-query"
import _ from "lodash"

import { useState } from "react"

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", searchInput],
    queryFn: async () => {
      // guard
      if (searchInput == null || searchInput.trim() == "") return null
      return fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`).then(
        (res) => res.json()
      )
    }
  })
  console.log(data)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
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
          search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
