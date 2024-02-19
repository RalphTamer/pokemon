import { ReactNode } from "react"
import Link from "next/link"

import ImageWrapper from "./ImageWrapper"
import Button from "./Button"

type Props = {
  title: string
  subtitle: string
  children?: ReactNode
}
const ErrorUI = (props: Props) => {
  const { title, subtitle } = props
  return (
    <div className="flex max-md:flex-col items-center gap-4 container">
      <ImageWrapper
        src="/images/crying-pikachu-image.png"
        alt="pikachu crying"
        styles={{
          width: "50%",
          height: "100%"
        }}
      />
      <div className="space-y-4">
        <h1 className="w-full text-[28px] text-center">{title}</h1>
        <p className="w-full  text-center">{subtitle}</p>
        <div className="flex justify-center">
          <Button name="go to home page">
            <Link href={"/"}>Go to homepage</Link>
          </Button>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default ErrorUI
