import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
    let navigate = useNavigate()
    let [userName, setuserName] = useState('')
    let [password, setPassword] = useState('')

    let handleSubmit = () => {
        if ((userName == 'admin@gmail.com') && (password == 1234)) {
            navigate('/dashboard')

        } else {
            alert('invalid credentials')
        }
    }
    return (
        <div className="login">
            <form action="" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <br />
                <label htmlFor="username" className='label1'>User Name</label>
                <input id="username" type="text" value={userName} onChange={(e) => setuserName(e.target.value)} />

                <br /><br />
                <label htmlFor="password" className='label2'>Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <br /><br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
