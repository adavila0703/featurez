import { configureStore, Action, combineReducers } from '@reduxjs/toolkit'
import { tableStateReducer } from '../components/table/Table.reducer'
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { ITableState } from '../components/table/Table.reducer'
import { createLogger } from 'redux-logger'
import { ISettingsState, settingsReducer } from '../components/settings/UserSettings.reducer'

export const appReducer = combineReducers({
  tableState: tableStateReducer,
  settings: settingsReducer,
})

const rootReducer = (state: any, action: any): any => appReducer(state, action)

const middleware: any[] = [thunk as ThunkMiddleware<any>]
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({ collapsed: true }))
}

export const store = configureStore({
  middleware,
  reducer: rootReducer,
})

export type AppThunkDispatch = ThunkDispatch<IAppReducerState, any, Action<string>>

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export interface IAppReducerState {
  tableState: ITableState
  settings: ISettingsState
}
