declare module "ace-my-order" {
  /**
   * Details supplied by Ace
   */
  export interface PreviewsItem {
    code: string,
    title: string,
    price: number,
    reducedFrom?: number,
    publisher: string
  }

  /**
   * Details extracted from the Previews site
   */
  export interface PreviewsOnlineDetails {
    description: string,
    creators: string,
    url: {
      url: string,
      urlPrefix: string
    },
    coverImage: string,
    coverThumbnail: string
  }

}
