import { createReducer } from '@reduxjs/toolkit'
import {
  getFeatureListCompleted,
  deleteFeatureCompleted,
  createFeatureCompleted,
  searchFeature,
  resetFeatures,
} from './Table.actions'

export interface Feature {
  name: string
  value: string
}

export interface ITableState {
  featureList: Feature[]
  searchCache: Feature[]
  isLoading: boolean
}

export const getInitialTableState = (): ITableState => {
  return {
    featureList: [],
    searchCache: [],
    isLoading: true,
  }
}

export const tableStateReducer = createReducer(getInitialTableState(), (builder) =>
  builder
    .addCase(getFeatureListCompleted, (state, { payload }) => {
      state.searchCache = state.featureList
      const features: Feature[] = []
      payload['feature_list'].forEach((feature: any) => features.push(feature))
      state.featureList = features
      console.log('leng', state.featureList.length)
      if (state.featureList.length > 0) {
        state.isLoading = false
      }
    })
    .addCase(deleteFeatureCompleted, (state, { payload }) => {
      state.featureList = state.featureList.filter((feature) => !payload.includes(feature.name))
    })
    .addCase(createFeatureCompleted, (state, { payload }) => {
      const newFeatureList: Feature[] = []
      newFeatureList.push({ name: payload, value: '0' })
      state.featureList = newFeatureList
    })
    .addCase(searchFeature, (state, { payload }) => {
      state.featureList = state.searchCache
      if (payload === '') {
        return
      }
      const newFeatureList: Feature[] = state.featureList.filter((feature) => feature.name.match(payload))
      state.featureList = newFeatureList
    })
    .addCase(resetFeatures, (state, { payload }) => {
      state.isLoading = true
      state.featureList = payload
    })
)
