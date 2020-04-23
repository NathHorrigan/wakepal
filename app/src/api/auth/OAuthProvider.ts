import { AuthProvider } from './AuthProvider'
import { AuthenticatedUser } from './User'

export interface OAuthSession {
  userId: string
  accessToken: string
  refreshToken?: string
  tokenExpiration?: number
  profile?: AuthenticatedUser
}

export abstract class OAuthProvider implements AuthProvider {
  private static session: OAuthSession = {}

  static async login(): Promise<OAuthSession> {
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
    // If token has expired
    return await this.authenticate()
  }

  abstract authenticate(): Promise<OAuthSession>
  abstract reauthenticate(): Promise<OAuthSession>
  abstract logout(): null
}
