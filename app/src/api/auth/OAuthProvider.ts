export interface OAuthSession {
  userId: string
  accessToken: string
  refreshToken: string
  tokenExpiration: number
}

export abstract class OAuthProvider {
  private static session?: OAuthSession

  static async login(): Promise<OAuthSession> | undefined {
    const tokenExpiration = this.session?.tokenExpiration
    // If token is still valid then return cached result
    if (tokenExpiration && tokenExpiration > Date.now()) {
      return new Promise((resolve, _) => resolve(this.session))
    }
    // If we have a token but it's invalid then revalidate it
    if (tokenExpiration) {
      return await this.reauthenticate()
    }
    // If token has expired
    return await this.authenticate()
  }

  abstract authenticate(): Promise<OAuthSession>
  abstract reauthenticate(): Promise<OAuthSession>
  abstract logout: null
}
