// Route index默认二级路由

import { Routes, Route } from 'react-router-dom'
// import Login from "./pages/Login"
// import Login from '@/pages/Login'
import './App.scss'
import AuthRoute from '@/components/AuthRoute'
import { history, HistoryRouter } from '@/utils/history'

import { lazy, Suspense } from 'react'
const Login = lazy(() => import('./pages/Login'))
const GeekLayout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App() {
  return (
    // <BrowserRouter>
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200,
            }}
          >
            loading...
          </div>
        }
      >
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <GeekLayout />
                </AuthRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="article" element={<Article />} />
              <Route path="publish" element={<Publish />} />
            </Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </Suspense>
    </HistoryRouter>
    // </BrowserRouter>
  )
}

export default App
