"use client"
import { useGlobalStore } from "@/lib/store"
import { useEffect, useState } from "react"
import SVGIcon from "./UI/SVGIcon"

const ErrorPopup = () => {
  const [showError, setShowError] = useState<boolean>(false)
  const errorMessage = useGlobalStore((state) => state.errorMessage)

  useEffect(() => {
    if (errorMessage != null) {
      setShowError(true)

      const id = setTimeout(() => {
        useGlobalStore.setState({
          errorMessage: null
        })
        setShowError(false)
        clearInterval(id)
      }, 10000)

      // Cleanup function
      return () => clearTimeout(id)
    }
  }, [errorMessage])

  if (showError === false || errorMessage == null) return null
  return (
    <div
      className="fixed top-0 flex justify-end w-full px-4 pt-20 error_on_render gap-2 items-center"
      style={{
        zIndex: 90
      }}
    >
      <div
        className="cursor-pointer"
        onClick={() => {
          useGlobalStore.setState({
            errorMessage: null
          })
        }}
      >
        <SVGIcon name="x" size={20} />
      </div>

      <div
        className=" bg-red-500 py-2 px-4 text-white"
        style={{
          borderRadius: 12
        }}
      >
        {errorMessage}
      </div>
    </div>
  )
}

export default ErrorPopup
