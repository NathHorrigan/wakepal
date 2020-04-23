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
  static async authenticate(): Promise<OAuthSession> {
    // Trigger prompt for the user to login with Fitbit
    const authState = await authorize(config)
    // Create an authentication session that can be used
    const session = this.createSession(authState)
    // Save the session
    this.session = session
    // Return the session
    return session
  }

  static async reauthenticate(): Promise<OAuthSession> {
    const { refreshToken } = this.session
    // Revalidate token
    const refreshedState = await refresh(config, {
      refreshToken,
    })
    // reset local cache
    const session = this.createSession(refreshedState)
    this.session = session
    return session
  }

  static async logout() {
    const { refreshToken } = this.session
    // Revoke token
    await revoke(config, {
      tokenToRevoke: refreshToken,
      includeBasicAuth: true,
    })
    // Clear local cache
    this.session = undefined
  }

  private static createSession(fitbitResponse): OAuthSession {
    return {
      accessToken: fitbitResponse.accessToken,
      refreshToken: fitbitResponse.refreshToken,
      userId: fitbitResponse.tokenAdditionalParameters.user_id,
      tokenExpiration: Date.parse(fitbitResponse.accessTokenExpirationDate),
    }
  }
}
