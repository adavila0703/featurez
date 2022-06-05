import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { featureTableData } from './Table.selectors'
import { useAppDispatch } from '../../store/store'
import { getFeaturesList } from './Table.actions'
import { TableActionBar } from './tableactionbar/TableActionBar'
import { TableStyle, TableTitle, DataGridContainer } from './Table.styles'
import { TableSwitch } from './TableSwitch'
import { GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'

export const Table = () => {
  const dispatch = useAppDispatch()
  const features = useSelector(featureTableData)
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
        <DataGridContainer
          rows={rows}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(ids) => setSelected(ids)}
          autoPageSize
          selectionModel={selected}
        />
      </div>
    </TableStyle>
  )
}
