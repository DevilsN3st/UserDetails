import axios from 'axios'
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from './userTypes'

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest())
    axios
      .get('https://reqres.in/api/users?page=2')
      .then(response => {
        const users = response.data.data
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}
