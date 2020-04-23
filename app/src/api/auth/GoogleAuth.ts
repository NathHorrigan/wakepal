import { GoogleSignin } from '@react-native-community/google-signin'
import { OAuthProvider, OAuthSession } from './OAuthProvider'

export class GoogleAuthProvider extends OAuthProvider {
  private static session?: OAuthSession

  static async authenticate(): Promise<OAuthSession> {
    // Trigger prompt for the user to login with Google
    GoogleSignin.configure()
    await GoogleSignin.hasPlayServices()
    const authState = await GoogleSignin.signIn()
    // Create an authentication session that can be used
    const session = this.createSession(authState)
    // Save the session
    this.session = session
    // Return the session
    return session
  }

  static async logout() {
    // Revoke token
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    // Clear local cache
    this.session = undefined
  }

  private static createSession(googleResponse: any): OAuthSession {
    return {
      accessToken: googleResponse.idToken,
      userId: "0", // This method will eventually talk to Wakepal servers and get a real user id
      profile: {
        email: googleResponse.user.email,
        name: googleResponse.user.givenName,
      },
    }
  }
}
