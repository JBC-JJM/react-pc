// 路由拦截
//AuthRoute：高阶组件AuthRoute，以组件（children）为参数
//children：children插槽就是Layout组件
//Navigate：编程式导航中可以使用return组件Navigate来返回一个路由
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

export default AuthRoute
