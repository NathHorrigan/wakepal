import AsyncStorage from '@react-native-community/async-storage'
import { AuthProvider, AuthSession, BaseAuthProvider } from './AuthProvider'
import { AuthenticatedUser } from './User'

export interface OAuthSession {
  userId: string
  accessToken: string
  refreshToken?: string
  tokenExpiration?: number
  profile?: AuthenticatedUser
}

export abstract class OAuthProvider extends BaseAuthProvider {
  private static client: OAuthProvider
  private session: OAuthSession | undefined

  async getSession(): Promise<OAuthSession | undefined> {
    if (this.session) {
      const { accessToken, tokenExpiration } = this.session
      // If token is still valid then return cached result
      if (tokenExpiration && tokenExpiration > Date.now()) {
        return new Promise((resolve, _) => resolve(this.session))
      }
      // If we have a token but it's invalid then revalidate it
      if (tokenExpiration) {
        return await this.reauthenticate()
      }
      // If no expiration but we have a session
      if (accessToken) {
        return new Promise((resolve, _) => resolve(this.session))
      }
    }

    return Promise.resolve(undefined)
  }

  abstract reauthenticate(): Promise<AuthSession>
}
