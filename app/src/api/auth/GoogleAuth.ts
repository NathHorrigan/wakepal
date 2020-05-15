import { GoogleSignin } from '@react-native-community/google-signin'
import { OAuthProvider, OAuthSession } from './OAuthProvider'

export class GoogleAuthProvider extends OAuthProvider {
  private static client: GoogleAuthProvider

  constructor() {
    // Set the session id for saving
    super('google-auth')
  }

  static getClient(): GoogleAuthProvider {
    if (!GoogleAuthProvider.client) {
      GoogleAuthProvider.client = new GoogleAuthProvider()
    }

    return GoogleAuthProvider.client
  }

  async authenticate(): Promise<OAuthSession> {
    // Trigger prompt for the user to login with Google
    GoogleSignin.configure()
    await GoogleSignin.hasPlayServices()
    const authState = await GoogleSignin.signIn()
    // Create an authentication session that can be used
    const session = this.createSession(authState)
    // Save the session
    this.saveSession(session)
    // Return the session
    return session
  }

  async logout() {
    // Revoke token
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    // Clear local cache
    this.saveSession(null)
  }

  private createSession(googleResponse: any): OAuthSession {
    return {
      accessToken: googleResponse.idToken,
      userId: '0', // This method will eventually talk to Wakepal servers and get a real user id
      profile: {
        email: googleResponse.user.email,
        name: googleResponse.user.givenName,
      },
    }
  }
}
