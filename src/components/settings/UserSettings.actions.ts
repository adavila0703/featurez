import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import * as featurezRequests from '../../store/requests'

const noopAction = undefined
const route: string = 'api/settings/'

export const getUserSettingsStarted = createAction('STARTED_GET_USER_SETTINGS')
export const getUserSettingsFailed = createAction<any>('FAILED_GET_USER_SETTINGS')
export const getUserSettingsCompleted = createAction<any>('COMPLETED_GET_USER_SETTINGS')

export const getUserSettings =
  (): AppThunk<Promise<any>> =>
  async (dispatch): Promise<any> => {
    try {
      dispatch(getUserSettingsStarted())

      const resp = await dispatch(featurezRequests.getRequest(route + 'GetSettings', getUserSettingsCompleted))
      return resp
    } catch (error) {
      dispatch(getUserSettingsFailed(error))
      throw error
    }
  }

export const saveUserSettingsStarted = createAction('STARTED_SAVE_USER_SETTINGS')
export const saveUserSettingsFailed = createAction<any>('FAILED_SAVE_USER_SETTINGS')
export const saveUserSettingsCompleted = createAction<any>('COMPLETED_SAVE_USER_SETTINGS')

export const saveUserSettings =
  (address: string): AppThunk<Promise<any>> =>
  async (dispatch): Promise<any> => {
    try {
      dispatch(getUserSettingsStarted())
      const payload = { redis_address: address }

      const resp = await dispatch(featurezRequests.postRequest(payload, route + 'UpdateSettings', noopAction))
      return resp
    } catch (error) {
      dispatch(getUserSettingsFailed(error))
      throw error
    }
  }
