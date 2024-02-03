import { useState } from 'react'
import { BrowserRouter,Routes,Route, } from 'react-router-dom'
import Login from './pages/Login'
import Cards from './pages/Cards'
import Header from './components/Header'
import Signup from './pages/SignUp'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/login'element={<Login/>}/>
          <Route path='/sign-up'element={<Signup/>}/>
          <Route path='/'element={<Cards/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
