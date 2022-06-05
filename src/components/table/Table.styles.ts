import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'

export const TableStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  height: 600px;
  background-color: #00808033;
  border-radius: 10px;
`

export const TableTitle = styled.h1`
  font-wight: bold;
  display: flex;
  justify-content: center;
`
export const DataGridContainer = styled(DataGrid)`
  height: 80%;
`
