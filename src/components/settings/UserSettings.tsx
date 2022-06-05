import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TextField } from '@mui/material'
import { ButtonGroup, Button } from '@mui/material'
import { AddBox, Cancel } from '@mui/icons-material'
import { useAppDispatch } from '../../store/store'
import { SettingsTitle, ButtonContainer, BoxContainer, TextFieldsContainer, BoxItems } from './UserSettings.styles'
import { Modal } from '@mui/material'
import { redisAddressSelector } from './UserSettings.selectors'
import { saveUserSettings } from './UserSettings.actions'
import { getFeaturesList, resetFeatures } from '../table/Table.actions'

interface IUserSettings {
  open: boolean
  handleOpen: () => void
}

export const UserSettings = ({ open, handleOpen }: IUserSettings) => {
  const dispatch = useAppDispatch()
  const redisAddress = useSelector(redisAddressSelector)
  const [redisText, setRedisText] = useState<string>(redisAddress)

  const changeRedisText = (value: string) => {
    setRedisText(value)
  }

  const saveSettings = () => {
    dispatch(saveUserSettings(redisText))
    dispatch(resetFeatures([]))
    dispatch(getFeaturesList())
    handleOpen()
  }

  useEffect(() => {
    if (redisText === '') {
      setRedisText(redisAddress)
    }
  }, [redisAddress, redisText])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ width: '20%', margin: 'auto' }}>
          <BoxContainer>
            <SettingsTitle>Settings</SettingsTitle>
            <BoxItems>
              <TextFieldsContainer>
                <TextField
                  id="outlined-basic"
                  label="Redis Address"
                  variant="filled"
                  onChange={(e) => changeRedisText(e.currentTarget.value)}
                  fullWidth
                  value={redisText}
                />
              </TextFieldsContainer>
              <ButtonContainer>
                <ButtonGroup fullWidth>
                  <Button variant="outlined" size="small" startIcon={<Cancel />} onClick={handleOpen}>
                    Cancel
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<AddBox />} onClick={saveSettings}>
                    Save
                  </Button>
                </ButtonGroup>
              </ButtonContainer>
            </BoxItems>
          </BoxContainer>
        </div>
      </Modal>
    </div>
  )
}
