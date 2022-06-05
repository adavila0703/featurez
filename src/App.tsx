import React, { useEffect } from 'react'
import { Table } from './components/table/Table'
import { CreateForm } from './components/createform/CreateForm'
import { getFeaturesList } from './components/table/Table.actions'
import { useAppDispatch } from './store/store'
import { Routes, Route } from 'react-router-dom'
import { AppStyle } from './App.styles'
import { getUserSettings } from './components/settings/UserSettings.actions'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFeaturesList())
    dispatch(getUserSettings())
  }, [])

  return (
    <AppStyle>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/createform" element={<CreateForm />} />
      </Routes>
    </AppStyle>
  )
}

export default App
