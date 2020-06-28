import { useAuth0 as origUseAuth0 } from '../../plugins/gatsby-plugin-auth0'

interface IAuth0Context {
  isAuthenticated: boolean,
  user?: any,
  loading: boolean,
  popupOpen: boolean,
  loginWithPop():  void,
  handleRedirectCallback(): void,
  getIdTokenClaims(): Promise<any>,
  loginWithRedirect(): void,
  getTokenSilently(): Promise<any>,
  getTokenWithPopup(): void,
  logout(): void,
  saveMetadata(md: any): void
}

const withType = () => (origUseAuth0() as unknown) as IAuth0Context

export {
  withType as useAuth0
}
