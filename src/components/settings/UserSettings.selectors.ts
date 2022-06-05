import { IAppReducerState } from '../../store/store'

export const redisAddressSelector = (state: IAppReducerState) => state.settings.redisAddress
