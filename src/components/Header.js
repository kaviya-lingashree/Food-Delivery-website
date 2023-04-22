import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Header() {

  let data = useCart();

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }


  return (
    <div>


      <nav className="navbar navbar-expand-lg bg-warning position-sticky">
        <div className="container-fluid">
          <Link className="navbar-brand brand" to="#">FunFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav list mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-6" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("authToken"))
                ? <li className="nav-item">
                  <Link className="nav-link active fs-6" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""
              }
            </ul>

            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn" to="/login">Log In </Link>
                <Link className="btn" to="/createuser">SignUp </Link>
              </div>
              :
              <div>
                <div className='btn' onClick={() => { setCartView(true) }}>
                  MyCart{" "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                </div>
                {cartView
                  ? <Modal onClose={() => setCartView(false)}>
                    <Cart />
                      </Modal>
                  : null}
                <div className='btn' onClick={handleLogout}>LogOut</div>
              </div>
            }


          </div>
        </div>
      </nav>

    </div>
  )
}
