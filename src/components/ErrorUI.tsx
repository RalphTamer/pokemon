import Link from "next/link"
import ImageWrapper from "./UI/ImageWrapper"
import Button from "./UI/Button"
import { ReactNode } from "react"

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
        <h3 className="w-full  text-center">{subtitle}</h3>
        <div className="flex justify-center">
          <Button>
            <Link href={"/"}>Go to homepage</Link>
          </Button>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default ErrorUI
