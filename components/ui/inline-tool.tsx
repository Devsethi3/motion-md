import Image from "next/image"

export const InlineTool = ({
  src,
  alt,
  size,
  label,
}: {
  src: string
  alt: string
  size: number
  label: string
}) => (
  <span className="inline-flex items-center gap-1 align-middle">
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="shrink-0"
    />
    <span>{label}</span>
  </span>
)
