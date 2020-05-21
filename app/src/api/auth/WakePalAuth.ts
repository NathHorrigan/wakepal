import { AuthSession, BaseAuthProvider } from './AuthProvider'

export class WakePalAuthProvider extends BaseAuthProvider {
  private static client: WakePalAuthProvider

  constructor() {
    // Set the session id for saving
    super('wakepal-auth')
  }

  static getClient(): WakePalAuthProvider {
    if (!WakePalAuthProvider.client) {
      WakePalAuthProvider.client = new WakePalAuthProvider()
    }

    return WakePalAuthProvider.client
  }

  async authenticate(email: string, password: string): Promise<AuthSession> {
    try {
      console.log(JSON.stringify({ email, password }))
      const req = await fetch(
        'https://wakepal.azurewebsites.net/api/users/authenticate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      )
      const authState = await req.json()
      // Create an authentication session that can be used
      const session = this.createSession(authState)
      // Save the session
      this.saveSession(session)
      // Return the session
      return session
    } catch (e) {
      console.log(e)
    }
  }

  async logout() {
    // Revoke token
    this.saveSession(null)
  }

  private createSession(response: any): AuthSession {
    return {
      accessToken: response.token,
      userId: response.userId, // This method will eventually talk to Wakepal servers and get a real user id
      profile: {
        email: response.email,
        name: response.firstName,
      },
    }
  }
}
