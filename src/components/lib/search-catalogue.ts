function searchCatalogue(searchTerm: string, catalogue: PreviewsItem[]) {
  const publisherOrTitleMatches = (regex: RegExp) =>
    (d: PreviewsItem) => regex.test(`${d.title} ${d.publisher}`)

  const terms = searchTerm.split(' ')
  const regex = terms
    .map((t) => `(?=.*${t})`)
    .reduce((a, b) => a + b, '')

  const re = new RegExp(regex, 'i')

  return catalogue.filter(publisherOrTitleMatches(re))
}

export { searchCatalogue }
