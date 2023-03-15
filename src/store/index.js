import { configureStore } from '@reduxjs/toolkit'
import LoginStore from '@/store/LoginStore'
import UserStore from'@/store/userStore'
export default configureStore({
    reducer: {
      // 注册子模块
      LoginStore,
      UserStore
    }
  })