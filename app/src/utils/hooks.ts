import React from 'react'
import { useSelector } from 'react-redux'

import { trackers, FitnessTracker } from '@api/fitness'
import { State } from '@redux/reducers'

export const useFitnessTracker = (externalState: State) => {
  let fitnessTrackerId: FitnessTracker | undefined

  // Get the tracker ID
  if (externalState) {
    fitnessTrackerId = externalState.fitness?.trackingMethod
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fitnessTrackerId = useSelector(
      (state: State) => state.fitness?.trackingMethod
    )
  }

  // Use the id to get the tracker class
  if (fitnessTrackerId) {
    return trackers[fitnessTrackerId]
  }

  // Oops - No Registered tracker
  return null
}
