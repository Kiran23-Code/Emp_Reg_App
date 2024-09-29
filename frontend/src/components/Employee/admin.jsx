import {Routes,Route} from "react-router-dom"
import Dashboard from '../navabar/dashboard'
import Home from './home'
import EmployeeList from '../Employee/emplist'
import CreateEmployee from '../Employee/createmp'
import EditEmployee from "./editEmployee"

const admin = () => {
    return ( 
        <div className="AdminRoute">
        <Dashboard />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Employee-List" element={<EmployeeList/>}/>
            <Route path='Create-Employee' element={<CreateEmployee />} />
            <Route path="Edit-Employee" element={<EditEmployee />} />
        </Routes>
    </div>
     );
}
 
export default admin;