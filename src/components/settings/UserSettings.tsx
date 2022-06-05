import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { ButtonGroup, Button } from '@mui/material'
import { AddBox, Cancel } from '@mui/icons-material'
import { useAppDispatch } from '../../store/store'
import { SettingsTitle, ButtonContainer, BoxContainer, TextFieldsContainer } from './UserSettings.styles'
import { Modal } from '@mui/material'

interface IUserSettings {
  open: boolean
  handleOpen: () => void
}

export const UserSettings = ({ open, handleOpen }: IUserSettings) => {
  // const dispatch = useAppDispatch()
  const [redisText, setRedisText] = useState<string>('')

  const changeRedisText = (value: string) => {
    setRedisText(value)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxContainer>
          <SettingsTitle>Settings</SettingsTitle>
          <TextFieldsContainer>
            <TextField
              id="outlined-basic"
              label="Redis Address"
              variant="filled"
              onChange={(e) => changeRedisText(e.currentTarget.value)}
              fullWidth
            />
          </TextFieldsContainer>
          <ButtonContainer>
            <ButtonGroup fullWidth>
              <Button variant="outlined" size="small" startIcon={<Cancel />} onClick={handleOpen}>
                Cancel
              </Button>
              <Button variant="outlined" size="small" startIcon={<AddBox />}>
                Save
              </Button>
            </ButtonGroup>
          </ButtonContainer>
        </BoxContainer>
      </Modal>
    </div>
  )
}
