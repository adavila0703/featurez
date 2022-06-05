import { IAppReducerState } from '../../store/store'
import { createSelector } from 'reselect'

export const featureSelector = (state: IAppReducerState) => state.tableState.featureList

export const featureTableData = createSelector(featureSelector, (featureList) => {
  return featureList
})

export const isLoadingSelector = (state: IAppReducerState) => state.tableState.isLoading
