"use client";
import React, { useState } from 'react';
import './style.css'; // Importing CSS file
import Image from 'next/image'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import video from "./assets/videoo.mp4"

function LoginForm() {
    const imageUrl  = './images/Ecom.jpg'

    const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    

    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
     
    axios.defaults.withCredentials = true;
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      axios.post('http://localhost:8083/api/post/retailor/login', values)
      .then(result => {
        if(result.status === 200) {
            console.log("Success")
            router.push('/dashboard/retailor');
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
        

        <div  className='main'  >
        <video src={video}  width={1799} height={955}  autoPlay loop muted/>
        {/* <Image src={myImage} alt="E-Commerce" width={1599} height={805} />; */}
            <div className="content">
                <header>Login Form</header>
                <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label> <br />
                    <div className="field">
                     
                    <input type="text" required placeholder="Email or Phone"
                     onChange={(e) => setValues({...values, email : e.target.value})} />
                    </div>
                    <label htmlFor="email">Password:</label>  
                    <div className="field space">
                        <span className="fa fa-lock"></span>
                        <input type={showPassword ? "text" : "password"} className="pass-key" required placeholder="Password" 
                         onChange={(e) => setValues({...values, password : e.target.value})}/>
                         <button >
                              {/* className="show" onClick={togglePasswordVisibility}>
                            {showPassword ? "HIDE" : "SHOW"} */}
                         </button>
                        {/* <span className="show">SHOW</span> */}
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
                    <div className="facebook">  <Link href="https://www.facebook.com/facebook/">  </Link> 
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
