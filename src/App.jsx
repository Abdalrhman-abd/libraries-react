import React from 'react'
import Home from './home/home'
import { Route , Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path='/' element={<Home />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App