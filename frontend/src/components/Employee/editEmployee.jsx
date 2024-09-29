import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editEmployee.css';

const EditEmployee = ({ employeeId }) => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch employee data on page load
    useEffect(() => {
        axios.get(`http://localhost:5000/employees/${employeeId}`)
            .then((response) => {
                const employee = response.data;
                setEmployeeData({
                    name: employee.name,
                    email: employee.email,
                    mobile: employee.mobile,
                    designation: employee.designation,
                    gender: employee.gender,
                    course: employee.course.split(', '), // convert to array
                    image: null,
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
                setLoading(false);
            });
    }, [employeeId]);

    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Mobile number validation (10 digits)
    const validateMobile = (mobile) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'course') {
            let updatedCourses = [...employeeData.course];
            if (e.target.checked) {
                updatedCourses.push(value);
            } else {
                updatedCourses = updatedCourses.filter(course => course !== value);
            }
            setEmployeeData({ ...employeeData, course: updatedCourses });
        } else {
            setEmployeeData({ ...employeeData, [name]: value });
        }
    };

    // Handle file upload (Only jpg/png allowed)
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setEmployeeData({ ...employeeData, image: file });
            setErrors({ ...errors, image: '' });
        } else {
            setErrors({ ...errors, image: 'Only JPG or PNG files are allowed' });
        }
    };

    // Form validation
    const validateForm = () => {
        const formErrors = {};
        if (!employeeData.name) formErrors.name = 'Name is required';
        if (!employeeData.email || !validateEmail(employeeData.email)) formErrors.email = 'Valid email is required';
        if (!employeeData.mobile || !validateMobile(employeeData.mobile)) formErrors.mobile = 'Valid mobile number is required';
        if (!employeeData.designation) formErrors.designation = 'Designation is required';
        if (!employeeData.gender) formErrors.gender = 'Gender is required';
        if (!employeeData.course.length) formErrors.course = 'At least one course must be selected';
        if (!employeeData.image) formErrors.image = 'Image upload is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Submit updated employee data
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append('name', employeeData.name);
            formData.append('email', employeeData.email);
            formData.append('mobile', employeeData.mobile);
            formData.append('designation', employeeData.designation);
            formData.append('gender', employeeData.gender);
            formData.append('course', employeeData.course.join(', '));
            if (employeeData.image) {
                formData.append('image', employeeData.image);
            }

            axios.put(`http://localhost:5000/employees/${employeeId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(() => {
                alert('Employee updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating employee:', error);
                alert('Failed to update employee.');
            });
        } else {
            alert('Please fix the form errors before submitting.');
        }
    };

    if (loading) return <div>Loading employee data...</div>;

    return (
        <div className="edit-employee-container">
            <h2>Employee Edit</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={employeeData.name} onChange={handleChange} />
                    {errors.name && <span className="error">{errors.name}</span>}

                    <label>Email</label>
                    <input type="email" name="email" value={employeeData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <label>Mobile No</label>
                    <input type="text" name="mobile" value={employeeData.mobile} onChange={handleChange} />
                    {errors.mobile && <span className="error">{errors.mobile}</span>}

                    <label>Designation</label>
                    <select name="designation" value={employeeData.designation} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    {errors.designation && <span className="error">{errors.designation}</span>}

                    <label>Gender</label>
                    <label>
                        <input type="radio" name="gender" value="Male" checked={employeeData.gender === 'Male'} onChange={handleChange} /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" checked={employeeData.gender === 'Female'} onChange={handleChange} /> Female
                    </label>
                    {errors.gender && <span className="error">{errors.gender}</span>}

                    <label>Course</label>
                    <label><input type="checkbox" name="course" value="MCA" checked={employeeData.course.includes('MCA')} onChange={handleChange} /> MCA</label>
                    <label><input type="checkbox" name="course" value="BCA" checked={employeeData.course.includes('BCA')} onChange={handleChange} /> BCA</label>
                    <label><input type="checkbox" name="course" value="BSC" checked={employeeData.course.includes('BSC')} onChange={handleChange} /> BSC</label>
                    {errors.course && <span className="error">{errors.course}</span>}

                    <label>Image Upload</label>
                    <input type="file" name="image" accept=".jpg,.png" onChange={handleImageUpload} />
                    {errors.image && <span className="error">{errors.image}</span>}
                </div>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditEmployee;
