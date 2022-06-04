import React, { useState } from 'react'
import { ButtonContainer, CreateFormTitlte } from './CreateForm.styles'
import { TextField } from '@mui/material'
import { ButtonGroup, Button } from '@mui/material'
import { AddBox, Cancel } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { getFeaturesList, createFeature } from '../table/Table.actions'

export const CreateForm = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const [featureName, setFeatureName] = useState<string>('')

  const navToTable = () => {
    dispatch(getFeaturesList())
    navigation('/')
  }

  const changeText = (value: string) => {
    setFeatureName(value)
  }

  const createFeatureHandler = () => {
    dispatch(createFeature(featureName))
    navigation('/')
  }
  return (
    <div>
      <CreateFormTitlte>Create Feature</CreateFormTitlte>
      <TextField
        id="outlined-basic"
        label="Feature Name"
        variant="outlined"
        onChange={(e) => changeText(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            createFeatureHandler()
          }
        }}
      />
      <ButtonContainer>
        <ButtonGroup fullWidth>
          <Button variant="outlined" size="small" startIcon={<Cancel />} color="error" onClick={navToTable}>
            Cancel
          </Button>
          <Button variant="outlined" size="small" startIcon={<AddBox />} color="primary" onClick={createFeatureHandler}>
            Create
          </Button>
        </ButtonGroup>
      </ButtonContainer>
    </div>
  )
}
