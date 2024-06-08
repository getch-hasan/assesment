
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './shared/Nav'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Invoice from './pages/Invoice/Invoice'

function App() {
 

  return (
    <>
     
     <Routes>
      <Route path='/form/:id'element={<Home></Home>}></Route>
      <Route path='/'element={<Products></Products>}></Route>
      <Route path='/invoice'element={<Invoice></Invoice>}></Route>
     </Routes>
    </>
  )
}

export default App
