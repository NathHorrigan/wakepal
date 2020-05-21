import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication'
import { OAuthProvider, OAuthSession } from './OAuthProvider'

export class AppleAuthProvider extends OAuthProvider {
  private static client: AppleAuthProvider

  constructor() {
    // Set the session id for saving
    super('apple-auth')
  }

  static getClient(): AppleAuthProvider {
    if (!AppleAuthProvider.client) {
      AppleAuthProvider.client = new AppleAuthProvider()
    }

    return AppleAuthProvider.client
  }

  async authenticate(): Promise<OAuthSession> {
    // Trigger prompt for the user to login with Google
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    })
    // Get current authentication state for user
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    )

    // If we aren't AUTHORIZED then fail
    if (credentialState !== AppleAuthCredentialState.AUTHORIZED) {
      return Promise.reject()
    }

    /* Create an authentication session that can be used
     * TODO: There needs to be a solution to cache AppleID creds...
     * https://github.com/invertase/react-native-apple-authentication/issues/17
     */
    const session = this.createSession(appleAuthRequestResponse)
    // Save the session
    this.saveSession(session)
    // Return the session
    return session
  }

  static reauthenticate() {
    // Stub
  }

  async logout() {
    // Revoke token
    if (this.session) {
      await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGOUT,
      })
      // Delete session cache
      this.saveSession(session)
    }
  }

  private createSession(appleResponse: any): OAuthSession {
    return {
      accessToken: appleResponse.authorizationCode,
      userId: '0', // This method will eventually talk to Wakepal servers and get a real user id
      profile: {
        email: appleResponse.email,
        name: appleResponse.fullName.givenName,
      },
    }
  }
}
