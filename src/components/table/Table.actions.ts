import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import * as featurezRequests from '../../store/requests'

const noopAction = undefined

export const getFeatureListStarted = createAction('STARTED_GET_FEATURE_LIST')
export const getFeatureListFailed = createAction<any>('FAILED_GET_FEATURE_LIST')
export const getFeatureListCompleted = createAction<any>('COMPLETED_GET_FEATURE_LIST')

export const getFeaturesList =
  (): AppThunk<Promise<any>> =>
  async (dispatch): Promise<any> => {
    try {
      dispatch(getFeatureListStarted())

      const resp = await dispatch(featurezRequests.getRequest('GetFeatureList', getFeatureListCompleted))
      return resp
    } catch (error) {
      dispatch(getFeatureListFailed(error))
      throw error
    }
  }

export const deleteFeatureStarted = createAction('STARTED_DELETE_FEATURE')
export const deleteFeatureFailed = createAction<any>('FAILED_DELETE_FEATURE')
export const deleteFeatureCompleted = createAction<(string | undefined)[]>('COMPLETED_DELETE_FEATURE')

export const deleteFeature =
  (featureName: (string | undefined)[]): AppThunk<Promise<any>> =>
  async (dispatch): Promise<any> => {
    try {
      dispatch(deleteFeatureStarted())

      const payload = { name: featureName }

      const resp = await dispatch(featurezRequests.deleteRequest(payload, 'DeleteFeature', noopAction))

      dispatch(deleteFeatureCompleted(featureName))
      return resp
    } catch (error) {
      dispatch(deleteFeatureFailed(error))
      throw error
    }
  }

export const updateFeatureStarted = createAction('STARTED_UPDATE_FEATURE')
export const updateFeatureFailed = createAction<any>('FAILED_UPDATE_FEATURE')
export const updateFeatureCompleted = createAction('COMPLETED_UPDATE_FEATURE')

export const updateFeature =
  (featureName: string, featureValue: string): AppThunk<Promise<any>> =>
  async (dispatch): Promise<any> => {
    try {
      dispatch(updateFeatureStarted())

      const payload = { name: featureName, value: featureValue }

      const resp = await dispatch(featurezRequests.postRequest(payload, 'UpdateFeature', noopAction))

      dispatch(updateFeatureCompleted())
      return resp
    } catch (error) {
      dispatch(updateFeatureFailed(error))
      throw error
    }
  }

export const createFeatureStarted = createAction('STARTED_CREATE_FEATURE')
export const createFeatureFailed = createAction<any>('FAILED_CREATE_FEATURE')
export const createFeatureCompleted = createAction<string>('COMPLETED_CREATE_FEATURE')

export const createFeature =
  (featureName: string): AppThunk<Promise<any>> =>
  async (dispatch): Promise<any> => {
    try {
      dispatch(createFeatureStarted())

      const payload = { name: featureName }

      const resp = await dispatch(featurezRequests.postRequest(payload, 'CreateFeature', noopAction))

      dispatch(createFeatureCompleted(featureName))
      return resp
    } catch (error) {
      dispatch(createFeatureFailed(error))
      throw error
    }
  }

export const searchFeature = createAction<string>('SEARCH_FEATURE')
