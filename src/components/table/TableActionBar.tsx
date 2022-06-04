import React from 'react'
import { ButtonGroup, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { getFeaturesList, searchFeature, deleteFeature } from '../table/Table.actions'
import { TextField } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import { featureTableData } from './Table.selectors'
import { TableActionBarContainer } from './Table.styles'

interface ITableActionBarProps {
  selected: GridSelectionModel
  setSelected: Function
}

export const TableActionBar = ({ selected, setSelected }: ITableActionBarProps) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const features = useSelector(featureTableData)

  const navToCreateForm = () => {
    dispatch(getFeaturesList())
    navigation('/createform')
  }

  const searchFeatureHandler = (value: string) => {
    dispatch(searchFeature(value))
  }

  const deleteFeatureHandler = (ids: GridSelectionModel) => {
    const featureIDMap = new Map<string, string>()
    features.forEach((feature, index) => {
      const newIndex: number = index + 1
      featureIDMap.set(newIndex.toString(), feature.name)
    })

    const featureNames: (string | undefined)[] = ids.map((id) => featureIDMap.get(id.toString()))
    dispatch(deleteFeature(featureNames))
    setSelected([])
    console.log(selected)
  }

  return (
    <TableActionBarContainer>
      <ButtonGroup>
        <Button onClick={navToCreateForm}>Create Feature</Button>
        {selected.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<DeleteOutline />}
            color="error"
            onClick={() => deleteFeatureHandler(selected)}
          >
            Delete
          </Button>
        )}
      </ButtonGroup>
      <TextField
        id="outlined-basic"
        label="Search Feature"
        variant="outlined"
        onChange={(e) => searchFeatureHandler(e.currentTarget.value)}
        size="small"
      />
    </TableActionBarContainer>
  )
}
