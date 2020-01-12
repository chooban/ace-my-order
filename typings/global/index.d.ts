/**
 * Details supplied by Ace
 */
interface PreviewsItem {
  previewsCode: string,
  title: string,
  price: number,
  reducedFrom?: number,
  publisher: string,
  previews: PreviewsOnlineDetails,
  slug: string
}

/**
 * Details extracted from the Previews site
 */
interface PreviewsOnlineDetails {
  description: string,
  creators: string,
  url: {
    url: string,
    urlPrefix: string
  },
  coverImage: string,
  coverThumbnail: string
}

type CartItem = PreviewsItem & PreviewsOnlineDetails
