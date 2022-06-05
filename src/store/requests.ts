import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import axios from 'axios'

export const getRequest = (endpoint: string, action: ActionCreatorWithPayload<any, any> | undefined) => {
  return (dispatch: any) => {
    axios
      .get(`http://localhost:1000/${endpoint}`)
      .then((resp) => {
        if (action !== undefined) {
          dispatch(action(resp.data))
        }
      })
      .catch((err) => console.log('error:', err))
  }
}

export const deleteRequest = (
  payload: any,
  endpoint: string,
  action: ActionCreatorWithPayload<any, any> | undefined
) => {
  return (dispatch: any) => {
    axios
      .delete(`http://localhost:1000/${endpoint}`, { data: payload })
      .then((resp) => {
        if (action !== undefined) {
          dispatch(action(resp.data))
        }
      })
      .catch((err) => console.log(err))
  }
}

export const postRequest = (payload: any, endpoint: string, action: ActionCreatorWithPayload<any, any> | undefined) => {
  return (dispatch: any) => {
    axios
      .post(`http://localhost:1000/${endpoint}`, payload)
      .then((resp) => {
        if (action !== undefined) {
          dispatch(action(resp.data))
        }
      })
      .catch((err) => console.log(err))
  }
}
