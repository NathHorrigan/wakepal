import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication'
import { OAuthProvider, OAuthSession } from './OAuthProvider'

export class AppleAuthProvider extends OAuthProvider {
  private static session?: OAuthSession

  static async authenticate(): Promise<OAuthSession> {
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
    this.session = session
    // Return the session
    return session
  }

  static async logout() {
    // Revoke token
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGOUT,
    })
    // Delete session cache
    this.session = undefined
  }

  private static createSession(appleResponse: any): OAuthSession {
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
