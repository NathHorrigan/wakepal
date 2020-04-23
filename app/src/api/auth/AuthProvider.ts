import { AuthenticatedUser } from './User'

// Base auth provider that any adapter accepts
export interface AuthProvider {
  login(): null
  logout(): null
}

export interface AuthSession {
  userId: string
  accessToken: string
  tokenExpiration?: number
  profile?: AuthenticatedUser
}
