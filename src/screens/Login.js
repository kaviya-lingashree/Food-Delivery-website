import React, { useState } from 'react'
import { Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://funfood-backend.onrender.com/api/loginuser", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            })
        });
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid Credentials")
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email)
            localStorage.setItem("authToken", json.authToken)
            console.log(localStorage.getItem("authToken"))
            navigate("/");
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
        <div>
          <Navbar />
        </div>
            <div className='container'>
                <form className='w-50 m-auto mt-5 border p-4 bg-light border-warning rounded' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} name='password' value={credentials.password} id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="m-3 btn bg-warning">Submit</button>
                    <Link to="/createuser" className='m-3 btn bg-danger'>I'am new user</Link>

                    
                </form>
            </div>
        </div>
    )
}

