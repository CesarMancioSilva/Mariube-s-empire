import { useState } from 'react'
import { BrowserRouter,Routes,Route, } from 'react-router-dom'
import Login from './pages/Login'
import Cards from './pages/Cardapio'
import Header from './components/Header'
import Signup from './pages/SignUp'
import Profile from './pages/Profile'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import Reserva from './pages/Reserva'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/cardapio'element={<Cards/>}/>
          <Route path='/reserva'element={<Reserva/>}/>
          <Route path='/'element={<Home/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
