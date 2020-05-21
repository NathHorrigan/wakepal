import AsyncStorage from '@react-native-community/async-storage'
import { AuthenticatedUser } from './User'

// Base auth provider that any adapter accepts
export interface AuthProvider {
  login(): Promise<AuthSession | null | undefined>
  logout(): Promise<void>
}

export interface AuthSession {
  userId: string
  accessToken: string
  profile?: AuthenticatedUser
}

export abstract class BaseAuthProvider implements AuthProvider {
  private sessionId: string
  private session: AuthSession | null | undefined

  constructor(sessionId: string) {
    this.sessionId = sessionId
    AsyncStorage.getItem(sessionId, undefined).then((session) => {
      if (session) {
        this.session = JSON.parse(session)
      }
    })
  }

  async login(...args: any): Promise<AuthSession | undefined | null> {
    if (this.session) {
      return await this.getSession()
    }

    // If token has expired
    return await this.authenticate(...args)
  }

  async getSession(): Promise<AuthSession | null | undefined> {
    return this.session
  }

  saveSession(session: AuthSession | null) {
    this.session = session
    AsyncStorage.setItem(this.sessionId, JSON.stringify(session))
  }

  static getClient(): BaseAuthProvider | void {}
  abstract authenticate(...args: any[]): Promise<AuthSession>
  abstract logout(): Promise<void>
}
