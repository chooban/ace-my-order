declare module "ace-my-order" {
  export type PreviewsItem = {
    code: string,
    title: string,
    price: number,
    reducedFrom?: number,
    publisher: string
  }
}
