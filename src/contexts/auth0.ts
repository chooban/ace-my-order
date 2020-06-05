import { useAuth0 as origUseAuth0 } from '../../plugins/gatsby-plugin-auth0'

interface IAuth0Context {
  isAuthenticated: boolean,
  user?: any,
  loading: boolean,
  popupOpen: boolean,
  loginWithPop():  void,
  handleRedirectCallback(): void,
  getIdTokenClaims(): void,
  loginWithRedirect(): void,
  getTokenSilently(): void,
  getTokenWithPopup(): void,
  logout(): void
}

const withType = () => (origUseAuth0() as unknown) as IAuth0Context

export {
  withType as useAuth0
}
