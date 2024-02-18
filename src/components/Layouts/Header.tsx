"use client"

import _ from "lodash"
import SearchBar from "../SearchBar"
import ImageWrapper from "../UI/ImageWrapper"
import Link from "next/link"
import { styles } from "@/lib/styles"
import { useGlobalStore } from "@/lib/store"

const Header = () => {
  return (
    <nav
      className="w-full  fixed top-0 container"
      style={{
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        boxShadow: "5px 5px 8px #ccc",
        zIndex: 99,
        background: styles.colors.blue
      }}
    >
      <div className="flex gap-4 items-center justify-between">
        <Link
          href="/"
          className=""
          onClick={() => {
            useGlobalStore.setState({
              searchResult: null
            })
          }}
        >
          <ImageWrapper
            alt="logo"
            src="/images/pokelogo.png"
            styles={{ width: 50, height: 50 }}
          />
        </Link>
        <SearchBar />
      </div>
    </nav>
  )
}

export default Header
