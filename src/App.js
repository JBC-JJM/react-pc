import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/pages/Layout"
// import Login from "./pages/Login"
import Login from "@/pages/Login"
import AuthRoute from "@/components/AuthRoute"

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <link rel="stylesheet" href="" />
        <Routes>
          <Route path="/*" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App