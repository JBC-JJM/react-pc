// Route index默认二级路由

import { Routes, Route } from 'react-router-dom'
import GeekLayout from '@/pages/Layout'
// import Login from "./pages/Login"
import Login from '@/pages/Login'
import './App.scss'
import AuthRoute from '@/components/AuthRoute'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'
import Home from '@/pages/Home'
import { history, HistoryRouter } from '@/utils/history'
function App() {
  return (
    // <BrowserRouter>
    <HistoryRouter history={history}>
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
    </HistoryRouter>
    // </BrowserRouter>
  )
}

export default App
