import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Admin from './components/Employee/admin'
import Dashboard from './components/navabar/dashboard'
import EmployeeList from './components/Employee/emplist'
import CreateEmployee from './components/Employee/createmp'
import EditEmployee from './components/Employee/editEmployee'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin-portal/*' element={<Admin />}></Route>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Employee-List' element={<EmployeeList />} />
          <Route path='/Create-Employee' element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
