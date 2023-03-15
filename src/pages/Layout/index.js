// Outlet:二级路由出口（渲染）,二级路由默认页面
// document.location:url的信息,使用这种原生的方法可能会打乱react的更新机制，也就是可能有其他bug
// selectedKeys:muen菜单当前的选项高亮对应url
// useEffect:需要异步调用，所以在里再使用立即执行函数来实现，同时当每次dispacth时刷新
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getUserInfo } from '@/store/userStore'
import {loginOut} from '@/store/LoginStore'
import { useDispatch, useSelector } from 'react-redux'
const { Header, Sider } = Layout

const GeekLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.UserStore)
  const location = useLocation()
  const items = [
    { label: <Link to="/">数据概览</Link>, key: '/', icon: <HomeOutlined /> },
    {
      label: <Link to="/article">内容管理</Link>,
      key: '/article',
      icon: <DiffOutlined />,
    },
    {
      label: <Link to="/publish">发布文章</Link>,
      key: '/publish',
      icon: <EditOutlined />,
    },
  ]
  const onLogout=()=>{
    const outAction=loginOut()
    dispatch(outAction)
    navigate('/login')
  }
  useEffect(() => {
    (async () => {
      try {
        const useAction = await getUserInfo()
        dispatch(useAction)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [dispatch])
  return (
    <Layout>
      <Header className="header">
        <div className="logo"></div>
        <div className="user-info">
          <span className="user-name">{userInfo.mobile}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" onConfirm={onLogout} okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider>
          <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="dark"
            items={items}
            selectedKeys={location.pathname}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
