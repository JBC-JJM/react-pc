// http://geek.itheima.net/v1_0/user/profile请求数据，需要token

import { createSlice } from '@reduxjs/toolkit'
import { http } from '@/utils'
const UserStore = createSlice({
  name: 'login',
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
  },
})
const { setUserInfo } = UserStore.actions
const getUserInfo = () => {
  return async (dispatch) => {
    const res = await http.get('/user/profile')
    dispatch(setUserInfo(res.data))
  }
}

export { getUserInfo }
const reducer = UserStore.reducer
export default reducer
