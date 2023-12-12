import React from 'react'
import {
    Link, useLocation, useNavigate
  } from "react-router-dom";

  

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  
  const handleLogout = (e)=>{
    console.log("Logout")
    e.preventDefault() ;
    localStorage.removeItem("token");
    navigate("/login");
  }
 
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
  <a className="navbar-brand navbar-light" style={{color:"white"}} to="/">iNotebook</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <Link className={`nav-link ${location.pathname==="/"? "active": ""} `} to="/">Home </Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname==="/about"? "active": ""} `} to="/about">About</Link>
      </li>
      
    </ul>
    {!localStorage.getItem("token")?<form className="form-inline my-2 my-lg-0">
    <Link to="/login" className="btn btn-primary btn-lg active mx-2" role="button" aria-pressed="true">Login
    </Link>
    <Link to="/signup" className="btn btn-primary btn-lg active mx-2" role="button" aria-pressed="true">Sign Up</Link>
    </form>: <button  onClick={handleLogout} className="btn btn-primary btn-lg active mx-2" aria-pressed="true">Log out</button>}
  </div>
  </div>
</nav>
  )
}

export default Navbar
