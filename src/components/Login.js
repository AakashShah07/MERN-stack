import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [credentials, setcredentials] = useState({email:"", password:""});
  const navigate = useNavigate();

  const hadleSubmit = async(e)=>{
    e.preventDefault() ;
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST', 
         headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password}) 
    });
    const json = await response.json() ;
    console.log(json) ;

    if(json.success){
      //
      localStorage.setItem("token", json.authToken) ;
      props.showAlert("Logged in successfully", "success") ;
      navigate('/');
    }
    else{
      props.showAlert("Invalid details", "danger") ;
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

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">LOGIN</p>

                <form className="mx-1 mx-md-4" onSubmit={hadleSubmit}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" value={credentials.email} id="email" onChange={onChangee} name="email" className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">Email</label>
                    </div>
                  </div>


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password"  value={credentials.password}  onChange={onChangee} id="passsword" name="password" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>

                  

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={hadleSubmit}  className="btn btn-primary btn-lg">Login</button>
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

export default Login
