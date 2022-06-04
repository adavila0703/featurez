import React, { useState } from 'react'
import { Switch } from '@mui/material'
import { updateFeature } from './Table.actions'
import { useAppDispatch } from '../../store/store'

interface ITableSwitchProps {
  featureName: string
  initialSwitchValue: boolean
}

export const TableSwitch = ({ featureName, initialSwitchValue }: ITableSwitchProps) => {
  const dispatch = useAppDispatch()
  const [switchValue, setSwitchValue] = useState<boolean>(initialSwitchValue)

  const changeSwitch = () => {
    dispatch(updateFeature(featureName, switchValue ? '0' : '1'))
    setSwitchValue(!switchValue)
  }

  return <Switch checked={switchValue} onChange={changeSwitch}></Switch>
}
