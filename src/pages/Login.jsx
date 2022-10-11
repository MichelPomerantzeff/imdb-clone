import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import '../css/Login.css'

import { auth } from "../config/firebase"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function signIn(e) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                user && navigate('/')

            })
            .catch((error) => {
                alert(error.message)
            });

    }

    return (
        <div className='login_container'>

            <div className="login_wrapper">

                <div onClick={() => navigate("/")} className="login_logo">
                    <span>Movie App</span>
                    <LiveTvRoundedIcon className='login_tv_icon' />
                </div>


                <form className='login_box'>
                    <h2>Sign in</h2>
                    <div className='login_input_container'>
                        <label>Email</label>
                        <input onChange={e => setEmail(e.target.value)} className='email' type="email" placeholder='Email' />
                    </div>
                    <div className='login_input_container'>
                        <label>Password</label>
                        <input onChange={e => setPassword(e.target.value)} className='password' type="password" placeholder='Password' />
                    </div>
                    <button onClick={signIn} className='signIn_button'>Sign in</button>
                    <button onClick={() => navigate("/register")} className='to_signUp_button'>Create an account</button>
                    <p className='forgot_password'>Forgot password</p>
                </form>
            </div>

            <footer>&copy; 2022 by Michel Pomerantzeff</footer>

        </div>
    );
}

export default Login;