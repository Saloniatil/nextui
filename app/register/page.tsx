"use client"
import React, { useState } from 'react';
import './style.css'; // Importing CSS file
import { FaUser, FaLock } from "react-icons/fa";
import Image from 'next/image'
import myImage from './images/Ecom.jpg'
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
 function LoginForm() {
     
    const imageUrl  = './images/Ecom.jpg'

    const router = useRouter();
    const [values, setValues] = useState({
       owner_name: '',
        email: '',
        password: ''
    }) 
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    
    axios.defaults.withCredentials = true;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      axios.post('http://localhost:8083/api/post/retailor/register', values)
      .then(result => {
        if(result.status === 200) {
              console.log("Success")
              router.push('/login');
        }  else{
            setError(result.data.Error)
        }
      })
      .catch(err => console.log(err))
    } 
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (   
        <div   >
        <Image src={myImage} alt="E-Commerce" width={1599} height={730} />;
            <div className="content">
                <header>Register</header>
                <form onSubmit={handleSubmit}>
                <label htmlFor="text">  Username:</label>  
                <div className='field'>
                <FaUser />
                <input  type='text' required placeholder='Username'
                      onChange={(e) => setValues({...values, owner_name : e.target.value})}/> 
                </div>
                <br />
                <label htmlFor="email">Email:</label>  
                    <div className="field">
                     <FaUser />
                    <input type="text" required placeholder="Email or Phone"
                    onChange={(e) => setValues({...values, email : e.target.value})} />
                    </div>
                    <label htmlFor="password">Password:</label>  
                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <input type={showPassword ? "text" : "password"} className="pass-key" required placeholder="Password" 
                         onChange={(e) => setValues({...values, password : e.target.value})}/>
                         <button   className="show" onClick={togglePasswordVisibility}>
                            {showPassword ? "HIDE" : "SHOW"}
                         </button>
                    </div>
                    
                    <div className="pass">
                        <a href="#">Forget Password?</a>
                    </div>
                    <div className="field">
                        <input type="submit" value="LOGIN" />
                    </div>
                </form>
                <div className="login">Or login with</div>
                <div className="links">
                    <div className="facebook">
                        <i className="fab fa-facebook-f"><span>Facebook</span></i>
                    </div>
                    <div className="instagram">
                        <i className="fab fa-instagram"><span>Instagram</span></i>
                    </div>
                </div>
                <div className="signup">
                have account?
                    <a href="#">Signup Now</a>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
