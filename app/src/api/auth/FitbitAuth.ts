import { OAuthProvider, OAuthSession } from './OAuthProvider'
import { authorize, refresh, revoke } from 'react-native-app-auth'

import Config from 'react-native-config'

const config = {
  clientId: Config.FITBIT_CLIENT_ID,
  clientSecret: Config.FITBIT_SECRET,
  redirectUrl: 'com.wakepal://redirect',
  scopes: ['activity', 'sleep'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
  },
}

export class FitbitAuthProvider extends OAuthProvider {
  private static client: FitbitAuthProvider
  private session: OAuthSession | undefined

  constructor() {
    // Set the session id for saving
    super('fibit-auth')
  }

  static getClient(): FitbitAuthProvider {
    if (!FitbitAuthProvider.client) {
      FitbitAuthProvider.client = new FitbitAuthProvider()
    }

    return FitbitAuthProvider.client
  }

  async authenticate(): Promise<OAuthSession> {
    // Trigger prompt for the user to login with Fitbit
    const authState = await authorize(config)
    // Create an authentication session that can be used
    const session = this.createSession(authState)
    // Save the session
    this.saveSession(session)
    // Return the session
    return session
  }

  async reauthenticate(): Promise<OAuthSession> {
    try {
      const { refreshToken } = this.session
      // Revalidate token
      const refreshedState = await refresh(config, {
        refreshToken,
      })
      // reset local cache
      const session = this.refreshSession(refreshedState)
      // Save the session
      this.saveSession(session)
      return session
    } catch (e) {
      console.log(e)
      return await this.authenticate()
    }
  }

  async logout() {
    if (this.session?.accessToken) {
      // Revoke token
      await revoke(config, {
        tokenToRevoke: this.session.accessToken,
        sendClientId: true,
        includeBasicAuth: true,
      })
      // Clear local cache
      this.saveSession(null)
    }
  }

  private refreshSession(fitbitResponse): OAuthSession {
    return {
      accessToken: fitbitResponse.accessToken,
      refreshToken: fitbitResponse.refreshToken,
      userId: fitbitResponse.additionalParameters.user_id,
      tokenExpiration: Date.parse(fitbitResponse.accessTokenExpirationDate),
    }
  }

  private createSession(fitbitResponse): OAuthSession {
    return {
      accessToken: fitbitResponse.accessToken,
      refreshToken: fitbitResponse.refreshToken,
      userId: fitbitResponse.tokenAdditionalParameters.user_id,
      tokenExpiration: Date.parse(fitbitResponse.accessTokenExpirationDate),
    }
  }
}
