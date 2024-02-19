"use client"

import Link from "next/link"
import _ from "lodash"

import ImageWrapper from "../UI/ImageWrapper"
import { useGlobalStore } from "@/lib/store"
import { styles } from "@/lib/styles"
import SearchBar from "../SearchBar"

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
          onClick={() => {
            useGlobalStore.setState({
              searchResult: null
            })
          }}
        >
          <ImageWrapper
            alt="logo"
            src="/images/poke-logo.png"
            styles={{ width: 50, height: 50 }}
          />
        </Link>
        <SearchBar />
      </div>
    </nav>
  )
}

export default Header
