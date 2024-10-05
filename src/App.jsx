
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Auth from './pages/Auth'
import Footer from './components/Footer'


function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard'element={<Dashboard/>}/>
      <Route path='/project' element={<Project/>}/>
     {/*  access the path that is not set */}
      <Route path='*' element={<PageNotFound/>}/>  
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
    </Routes>
      <Footer/>
    </>
  )
}

export default App
