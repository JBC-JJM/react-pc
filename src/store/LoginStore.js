// postsetToken：创建异步,返回一个异步函数来实现异步操作，
// Redux-thunk特性：再完成异步后再执行dispatch
// ({ mobile, code }):在外的该函数不是reduer方法，所以没有action对象，但是可以使用普通的函数传参

import { createSlice } from "@reduxjs/toolkit";
import { http } from "@/utils";
import { getToken, setToken as setTokenLocal ,removeToken} from "@/utils/token";
const login = createSlice({
    name: 'login',
    initialState: {
        // 防止被重新初始化,注意是直接调用函数
        token: getToken() || '',
    },
    reducers: {
        setToken (state, action) {
            state.token = action.payload
            setTokenLocal(state.token)
        },
        loginOut(state){
            removeToken()
            state.token=''
        }
    },
})
// 
const { setToken } = login.actions
const url = 'http://geek.itheima.net/v1_0/authorizations'
const postsetToken = ({ mobile, code }) => {
    // console.log(mobile,code)
    return async (dispatch) => {
        const res = await http.post(url, { mobile, code })
        dispatch(setToken(res.data.token))
    }
}


// 封装并导出actions
const { add,loginOut} = login.actions
export { postsetToken, add ,loginOut}
// 封装并导出reducer
const reducer = login.reducer
export default reducer