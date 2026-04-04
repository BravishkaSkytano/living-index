import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, isAbsoluteURL, joinSegments, pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

type BannerVariant = "banner" | "cover"

function resolveBannerData(fileData: QuartzComponentProps["fileData"]): {
  src: string
  variant: BannerVariant
} | null {
  const rawBanner = fileData.frontmatter?.banner
  const rawImage = fileData.frontmatter?.image
  const rawCover = fileData.frontmatter?.cover
  const source =
    typeof rawBanner === "string"
      ? { value: rawBanner, variant: "banner" as const }
      : typeof rawImage === "string"
        ? { value: rawImage, variant: "banner" as const }
        : typeof rawCover === "string"
          ? { value: rawCover, variant: "cover" as const }
          : null

  if (!source) {
    return null
  }

  const trimmedBanner = source.value.trim()
  if (trimmedBanner.length === 0) {
    return null
  }

  if (isAbsoluteURL(trimmedBanner) || trimmedBanner.startsWith("/")) {
    return { src: trimmedBanner, variant: source.variant }
  }

  const slug = fileData.slug as FullSlug | undefined
  if (!slug) {
    return { src: trimmedBanner, variant: source.variant }
  }

  return {
    src: joinSegments(pathToRoot(slug), trimmedBanner),
    variant: source.variant,
  }
}

const BannerImage: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const bannerData = resolveBannerData(fileData)
  if (!bannerData) {
    return null
  }

  const title = fileData.frontmatter?.title ?? "Page banner"
  return (
    <div class={classNames(displayClass, "page-banner", `page-banner-${bannerData.variant}`)}>
      <img class="page-banner-image" src={bannerData.src} alt={title} loading="eager" />
    </div>
  )
}

BannerImage.css = `
.page-banner {
  margin: 1.5rem 0 1rem;
  border-radius: 1rem;
  background: var(--lightgray);
}

.page-banner-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
}

@media (min-width: 801px) {
  .page-banner-cover {
    float: left;
    width: min(50%, 22rem);
    margin: 0.75rem 1.5rem 1rem 0;
  }
}

@media (max-width: 800px) {
  .page-banner {
    border-radius: 0.75rem;
  }

  .page-banner-cover {
    width: 100%;
    height: 100%;
    margin-right: 0;
  }
}
`

export default (() => BannerImage) satisfies QuartzComponentConstructor
