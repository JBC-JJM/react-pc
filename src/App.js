import { BrowserRouter,Routes,Route } from "react-router-dom"
import Layout from "@/pages/Layout"
// import Login from "./pages/Login"
import Login from "@/pages/Login"

function App () {
  return (
    <BrowserRouter>
    <div className="App">
      <link rel="stylesheet" href="" />
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/Layout" element={<Layout/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App