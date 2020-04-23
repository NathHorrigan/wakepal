import { GoogleAuthProvider } from './GoogleAuth'
import { FitbitAuthProvider } from './FitbitAuth'
import { AppleAuthProvider } from './AppleAuth'

export enum AuthProviders {
  Apple = 'apple',
  Google = 'google',
  Fitbit = 'fitbit',
}

export const providers = {
  apple: AppleAuthProvider,
  google: GoogleAuthProvider,
  fitbit: FitbitAuthProvider,
}

export type { AuthSession } from './AuthProvider'
