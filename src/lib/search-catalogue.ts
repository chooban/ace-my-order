import { AceItem } from '../../typings/autogen/'

function searchCatalogue(searchTerm: string, catalogue: AceItem[]) {
  const publisherOrTitleMatches = (regex: RegExp) =>
    (d: AceItem) => regex.test(`${d.title} ${d.publisher} ${d.previews?.creators}`)

  const terms = searchTerm.split(' ')
  const regex = terms
    .map((t) => `(?=.*${t})`)
    .reduce((a, b) => a + b, '')

  const re = new RegExp(regex, 'i')

  return catalogue.filter(publisherOrTitleMatches(re))
}

export { searchCatalogue }
