"use client"

import { useState } from "react"

const FALLBACK_IMAGE = "/activity-placeholder.svg"

export default function ActivityImage({
  src,
  alt,
  className,
}: {
  src?: string | null
  alt: string
  className?: string
}) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE)

  return (
    // Activity images are admin supplied URLs from many domains; the runtime fallback handles failed sources.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE)
      }}
    />
  )
}
