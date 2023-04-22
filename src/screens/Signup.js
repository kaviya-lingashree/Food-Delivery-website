import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function Signup() {

    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})
    let navigate = useNavigate()
    let [address, setAddress] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        let navLocation = () => {
          return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
          });
        }
        let latlong = await navLocation().then(res => {
          let latitude = res.coords.latitude;
          let longitude = res.coords.longitude;
          return [latitude, longitude]
        })
        let [lat, long] = latlong
        console.log(lat, long)
        const response = await fetch("https://funfood-backend.onrender.com/api/getlocation", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ latlong: { lat, long } })
    
        });
        const { location } = await response.json()
        console.log(location);
        setAddress(location);
        setcredentials({ ...credentials, [e.target.name]: location })
      }




    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("https://funfood-backend.onrender.com/api/createuser",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location: credentials.geolocation,
            })
        });
        const json = await response.json()
        console.log(json);

        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")
      
          }
          else {
            alert("Enter Valid Credentials")
          }
    }

    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    return (
        <>
         <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
         <div><Header/></div>
        <div className='container'>
            <form className='w-50 m-auto mt-5 border bg-light p-4 border-warning rounded' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name='password' value={credentials.password}id="exampleInputPassword1" />
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="exampleInputaddress" className="form-label">Address</label>
                    <input type="text" className="form-control" onChange={onChange} name='geolocation' value={credentials.geolocation}id="exampleInputAddress1" />
                </div> */}

              <div className="m-3">
              <label htmlFor="address" className="form-label">Address</label>
              <fieldset>
                <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>
            <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
            </div>

                <button type="submit" className="m-3 btn bg-warning">Submit</button>
                <Link to="/login" className='m-3 btn bg-danger'>Already a user</Link>
            </form>
            </div>
            </div>
        </>
    )
}
