import Image from "next/image"

type Props = {
  src: string
  alt: string
  styles?: React.CSSProperties
}
const ImageWrapper = (props: Props) => {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: 1,
        ...props.styles
      }}
    >
      <Image
        src={props.src}
        alt={props.alt}
        style={{ objectFit: "cover" }}
        sizes="100vw , 100vh"
        fill
      />
    </div>
  )
}

export default ImageWrapper
