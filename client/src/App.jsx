import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/features/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import OtpComponent from "./components/auth/OtpComponent"
import Home from "./pages/Home"
import CheckAuth from "./components/features/CheckAuth"
import RequireAuth from "./components/features/RequireAuth"
import CryptoDetailedPage from "./pages/CryptoDetailedPage"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} >

          <Route element={<CheckAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OtpComponent />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/graph" element={<CryptoDetailedPage />} />
          </Route>

        </Route>
      </Routes>
    </div>
  )
}

export default App
