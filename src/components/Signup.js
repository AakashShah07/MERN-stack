import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setcredentials] = useState({name:"", email:"", password:"",cpassword:""});
  const navigate = useNavigate();

  const hadleSubmit = async(e)=>{
    e.preventDefault() ;
    const {name, email, password} = credentials ; 
    console.log("ONsubmit click")
    const response = await fetch("http:/localhost:5000/api/auth/createuser", {
      method: 'POST', 
         headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}) 
    });
    const json = await response.json() ;
    console.log(json) ;

    if(json.success){
      // Save the auth token and redirect 
      localStorage.setItem("token", json.authToken) ;
      navigate('/');
      props.showAlert("Account created successfully", "success") ;
    }
    else{
      props.showAlert("Invalid credentials", "danger") ;
    }
  } 

  const onChangee = (e) =>{
    setcredentials({...credentials, [e.target.name]: e.target.value})
  }



  return (
    <>
      
        <div className="card text-black" style={{borderRadius: 100 + 'px'}} >
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={hadleSubmit} >

                <div className="d-flex flex-row align-items-center mb-4">
                    <i  className="fa fa-envelope fa-lg me-3 fa-fw" aria-hidden="true"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text"  id="name" name="name" onChange={onChangee} required className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email"  id="email" name="email" onChange={onChangee} required className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">Email</label>
                    </div>
                  </div>


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="passsword" name="password" required  minLength={5} onChange={onChangee} className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="cpasssword" name="cpassword" required minLength={5} onChange={onChangee} className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">Conform Password</label>
                    </div>
                  </div>

                  

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" onSubmit={hadleSubmit} className="btn btn-primary btn-lg">Sign Up</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>


    </>
  )
}

export default Signup
