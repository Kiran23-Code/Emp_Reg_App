import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './emplist.css';

const Emplist = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/employees')
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the employee data!', error);
            });
    }, []);

    const handleEdit = (employeeId) => {
        navigate(`/adminportal/edit-employee/${employeeId}`); // Navigate to the edit page with the employee ID
    };

    const handleDelete = (employeeId) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            axios.delete(`http://localhost:5000/employees/${employeeId}`)
                .then(() => {
                    // Remove the deleted employee from the local state
                    setEmployees(employees.filter((employee) => employee.Id !== employeeId));
                })
                .catch((error) => {
                    console.error('There was an error deleting the employee!', error);
                });
        }
    };


    const filteredEmployees = employees.filter((employee) =>
        employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app">
            <h2>Employee List</h2>

            <div className="employee-header">
                <p>Total Count: {filteredEmployees.length}</p>
                {/* <a href="/create-employee"  className="create-employee-link">Create Employee</a> */}
                <Link to="/admin-portal/Create-Employee" className="create-employee-link">Create Employee</Link>
            </div>

            <div className="search-container">
                <label htmlFor="search">Search</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Enter Search Keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="employee-grid">
                <div className="grid-header">
                    <div>Unique ID</div>
                    <div>Image</div>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Mobile No</div>
                    <div>Designation</div>
                    <div>Gender</div>
                    <div>Course</div>
                    <div>Create Date</div>
                    <div>Action</div>
                </div>

                {filteredEmployees.map((employee) => (
                    <div className="grid-row" key={employee.f_Id}>
                        <div>{employee.Id}</div>
                        <div><img src={employee.Image || 'https://via.placeholder.com/50'} alt="profile" /></div>
                        <div>{employee.Name}</div>
                        <div>{employee.Email}</div>
                        <div>{employee.Mobile}</div>
                        <div>{employee.Designation}</div>
                        <div>{employee.gender}</div>
                        <div>{employee.Course}</div>
                        <div>{employee.Createdate}</div>
                        <div>
                            <button onClick={() => handleEdit(employee.Id)}>Edit</button>
                            <button onClick={() => handleDelete(employee.Id)}>Delete</button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Emplist;
