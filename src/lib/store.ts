import { FetchedPokeDetails } from "@/services/indexPage.service"
import { create } from "zustand"

type Store = {
  searchResult: FetchedPokeDetails | null
}
export const useGlobalStore = create<Store>((set) => ({
  searchResult: null
}))
