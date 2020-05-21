import { MERGE_FITNESS_DATA } from '@redux/actions'
import { fitnessReducer, initial } from '@redux/reducers/fitness'

const MOCK_TRACKING = () => [
  { date: '2020-01-02', steps: 1 },
  { date: '2020-01-03', steps: 2 },
  { date: '2020-01-04', steps: 3 },
  { date: '2020-01-05', steps: 4 },
  { date: '2020-01-06', steps: 5 },
  { date: '2020-01-07', steps: 6 },
]

describe('Fitness Reducer', () => {
  // Test initial state
  it('Empty object results in intial state', () => {
    expect(fitnessReducer(undefined, {})).toEqual(initial)
  })

  // Test initial setup from onboarding
  it('Onboarding setup initializes history', () => {})

  // Test a recording merge...
  it('Merges data to empty state correctly (e.g It populates)', () => {
    // The action that merges the data, or populates in this case
    const action = {
      type: MERGE_FITNESS_DATA,
      data: MOCK_TRACKING(),
    }
    // Check if data changes how we expect
    expect(fitnessReducer(initial, action)).toEqual({
      ...initial,
      recordings: MOCK_TRACKING(),
    })
  })

  // Test a recording merge...
  it('Merges data to non-overlapping data correctly (e.g It appends)', () => {
    // Data procceeds the merging data
    const INITIAL_RECORDINGS = [{ date: '2020-01-01', steps: 0 }]
    // The action that merges the data, or appends in this case
    const action = {
      type: MERGE_FITNESS_DATA,
      data: MOCK_TRACKING(),
    }
    // Check if data changes how we expect
    expect(
      fitnessReducer(
        {
          ...initial,
          recordings: INITIAL_RECORDINGS,
        },
        action
      )
    ).toEqual({
      ...initial,
      recordings: [...INITIAL_RECORDINGS, ...MOCK_TRACKING()],
    })
  })

  // Test a recording merge...
  it('Merges data to overlapping data correctly', () => {
    // Data that overlaps and we will override
    const INITIAL_RECORDINGS = [
      { date: '2020-01-01', steps: 0 },
      { date: '2020-01-02', steps: -1 },
      { date: '2020-01-03', steps: -1 },
      { date: '2020-01-04', steps: -1 },
    ]
    // The action that merges the data
    const action = {
      type: MERGE_FITNESS_DATA,
      data: MOCK_TRACKING(),
    }
    // Check if data changes how we expect
    expect(
      fitnessReducer(
        {
          ...initial,
          recordings: INITIAL_RECORDINGS,
        },
        action
      )
    ).toEqual({
      ...initial,
      recordings: [{ date: '2020-01-01', steps: 0 }, ...MOCK_TRACKING()],
    })
  })
})
