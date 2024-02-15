"use client"

import _ from "lodash"
import SearchBar from "../SearchBar"
import ImageWrapper from "../UI/ImageWrapper"

const Header = () => {
  return (
    <nav
      className="w-full bg-[#3B4CCA] fixed top-0"
      style={{
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        boxShadow: "5px 5px 8px #ccc",
        zIndex: 999999
      }}
    >
      <div className="flex items-center justify-between container px-[100px]">
        <div className="w-[50px]">
          <ImageWrapper alt="logo" src="/pokelogo.png" />
        </div>
        <SearchBar />
      </div>
    </nav>
  )
}

export default Header
