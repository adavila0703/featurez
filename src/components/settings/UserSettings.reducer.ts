import { createReducer } from '@reduxjs/toolkit'
import { getUserSettingsCompleted } from './UserSettings.actions'

export interface ISettingsState {
  redisAddress: string
}

export const getInitialSettingsState = (): ISettingsState => {
  return {
    redisAddress: '',
  }
}

export const settingsReducer = createReducer(getInitialSettingsState(), (builder) =>
  builder.addCase(getUserSettingsCompleted, (state, { payload }) => {
    state.redisAddress = payload['redis_address']
  })
)
