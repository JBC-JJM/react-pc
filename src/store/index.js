import { configureStore } from '@reduxjs/toolkit'
import LoginStore from '@/store/LoginStore'
export default configureStore({
    reducer: {
      // 注册子模块
      LoginStore
    }
  })