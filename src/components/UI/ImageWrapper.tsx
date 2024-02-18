import Image from "next/image"

type Props = {
  className?: string
  src: string
  alt: string
  styles?: React.CSSProperties
}
const ImageWrapper = (props: Props) => {
  return (
    <div
      className={props.className}
      style={{
        position: "relative",
        // aspect ratio 1 for this website's sake only
        aspectRatio: 1,
        ...props.styles
      }}
    >
      <Image
        priority={true}
        src={props.src}
        alt={props.alt}
        style={{ objectFit: "cover" }}
        sizes="100vw , 100vh"
        loading="eager"
        fill
      />
    </div>
  )
}

export default ImageWrapper
