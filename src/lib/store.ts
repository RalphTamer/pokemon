import { create } from "zustand"

type Store = {
  test: string | null
}
export const useGlobalStore = create<Store>((set) => ({
  test: null
}))
