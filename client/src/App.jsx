import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useAuth } from './Context/AuthContext'
import Index from './components/Index'
import Statistics from './components/Statistics'
import Transactions from './components/Transactions'
import Acount from './components/Acount'
const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <Router>
      <Routes>
        <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} >
          <Route path='' element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
          <Route path='transactions' element={<Transactions />} />
          <Route path='statistics' element={<Statistics />} />
          <Route path='account' element={<Acount />} />
        </Route>
      </Routes>

    </Router>
  )
}

export default App
