// 路由拦截

import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    //编程式导航中可以使用return组件Navigate来返回一个路由
    return <Navigate to="/login" replace />
  }
}

export default  AuthRoute
