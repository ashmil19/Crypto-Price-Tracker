import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import OtpComponent from "./components/auth/OtpComponent"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OtpComponent />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
