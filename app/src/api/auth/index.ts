import { OAuthProvider } from './OAuthProvider'
import { GoogleAuthProvider } from './GoogleAuth'
import { FitbitAuthProvider } from './FitbitAuth'
import { AppleAuthProvider } from './AppleAuth'

export enum AuthProviders {
  Apple = 'apple',
  Google = 'google',
  Fitbit = 'fitbit',
}

export const providers: { [key: string]: any } = {
  apple: AppleAuthProvider.getClient(),
  google: GoogleAuthProvider.getClient(),
  fitbit: FitbitAuthProvider.getClient(),
}

export const logoutAllProviders = async () => {
  try {
    await Promise.all(
      Object.values(providers).map(async provider => await provider.logout())
    )
  } catch (error) {
    console.log(error)
  }
}

export type { AuthSession } from './AuthProvider'
