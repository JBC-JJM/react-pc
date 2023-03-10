import { createSlice } from "@reduxjs/toolkit";
import { http } from "@/utils";
import { getToken, setToken as setTokenLocal } from "../utils/token";
const login = createSlice({
    name: 'login',
    initialState: {
        // 防止被重新初始化
        token: getToken|| '',
    },
    reducers: {
        setToken (state, action) {
            state.token = action.payload
            setTokenLocal(state.token)
        },
    },
})
// 创建异步,在外的该函数不是reduer方法，所以没有action对象，但是可以使用普通的函数传参
const { setToken } = login.actions
const url = 'http://geek.itheima.net/v1_0/authorizations'
// 封装一个函数 在函数中return一个新函数 在新函数中封装异步
// 得到数据之后通过dispatch函数 触发修改
const postsetToken = ({ mobile, code }) => {
    // console.log(mobile,code)
    return async (dispatch) => {
        const res = await http.post(url, { mobile, code })
        await dispatch(setToken(res.data.token))
    }
}


// 封装并导出actions
const { add } = login.actions
export { postsetToken, add }
// 封装并导出reducer
const reducer = login.reducer
export default reducer