import React from 'react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import Signin from './components/signin/Signin'
import Reset from './components/reset/Reset'
import Create from './components/createpassword/Create'
import Navbar from './components/Navebar/Navbar'
import Observation from './components/admin/Observation'
import { Layout } from 'antd'

function App() {
  const {Content} = Layout
  return (
    <div>
      <Router>

        
      <div>
      <Routes>
      <Route path='/' element={<Signin/>}/>
            <Route path='/password-reset' element={<Reset/>}/>
            <Route path='/new-password/:token' element={<Create/>}/>  
                      
            <Route path='/observation' element={<Observation/>}/>
          
         
          </Routes>
        </div>

      </Router>
    </div>
  )
}

export default App