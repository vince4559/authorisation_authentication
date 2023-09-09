import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import RequiredAuth from './features/auth/RequiredAuth';
import Welcome from './features/auth/Welcome';
import Employees from './features/employee/Employees';



const App = () => {
  return (
    // <Public />
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public route */}
        <Route index element={<Public />}  />
        <Route path='/login' element={<Login />} />
 
        {/* protected route */}
        <Route element={<RequiredAuth />} >
            <Route path='welcome' element={<Welcome />} />
            <Route path='employees' element={<Employees />} />
        </Route>

      </Route>
    </Routes> 
  )
}

export default App
