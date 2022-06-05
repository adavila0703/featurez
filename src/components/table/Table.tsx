import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { featureTableData, isLoadingSelector } from './Table.selectors'
import { useAppDispatch } from '../../store/store'
import { getFeaturesList } from './Table.actions'
import { TableActionBar } from './tableactionbar/TableActionBar'
import { TableStyle, TableTitle, DataGridContainer, EmptyStateContainer } from './Table.styles'
import { TableSwitch } from './TableSwitch'
import { GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import { CircularProgress } from '@mui/material'

export const Table = () => {
  const dispatch = useAppDispatch()
  const features = useSelector(featureTableData)
  const isLoading = useSelector(isLoadingSelector)
  const [selected, setSelected] = useState<GridSelectionModel>([])

  const renderSwitch = (props: GridRenderCellParams<any>) => {
    return (
      <TableSwitch featureName={props.row.featureName} initialSwitchValue={props.row.active === '0' ? false : true} />
    )
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'featureName', headerName: 'Feature Name', width: 130 },
    { field: 'active', headerName: 'Active', width: 130, renderCell: renderSwitch, sortable: false },
  ]

  const rows = features.map((feature, index) => {
    return {
      id: index + 1,
      featureName: feature.name,
      active: feature.value,
    }
  })

  useEffect(() => {
    dispatch(getFeaturesList())
  }, [])

  return (
    <TableStyle>
      <div style={{ width: '100%' }}>
        <TableTitle>Featurez</TableTitle>
        <TableActionBar selected={selected} setSelected={setSelected} />
        <DataGridContainer>
          {!isLoading && (
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(ids) => setSelected(ids)}
              autoPageSize
              selectionModel={selected}
            />
          )}
          {isLoading && (
            <EmptyStateContainer>
              <CircularProgress size={50} thickness={5.0} />
            </EmptyStateContainer>
          )}
        </DataGridContainer>
      </div>
    </TableStyle>
  )
}
