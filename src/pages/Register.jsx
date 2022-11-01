import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import '../css/Login.css'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth} from "../config/firebase"

function Register(props) {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")

    function signUp(e) {
        e.preventDefault()

        // Create User
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                user && navigate('/')
            })
            .catch((error) => {
                alert(error)
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
                    <h2>Create account</h2>
                    <div className='login_input_container'>
                        <label>Your name</label>
                        <input /* onChange={e => setFirstName(e.target.value)} */ className='name' type="text" placeholder='First and last name' />
                    </div>

                    <div className='login_input_container'>
                        <label>Email</label>
                        <input onChange={e => setEmail(e.target.value)} className='email' type="email" placeholder='Email' />
                    </div>

                    <div className='login_input_container'>
                        <label>Password</label>
                        <input onChange={e => setPassword(e.target.value)} className='password' type="password" placeholder='At least 8 characters' />
                    </div>
                    <div className='login_input_container'>
                        <label>Re-enter password</label>
                        <input className='password' type="password" placeholder='Password' />
                    </div>

                    <button onClick={signUp} className='signUp_button'>Create account</button>
                    <div className='to_signin'>
                        <p>Already have an account ? </p>
                        <p onClick={() => navigate("/login")} className='to_signin_link'>Sign in</p>
                    </div>
                </form>
            </div>

            <footer>&copy; 2022 by Michel Pomerantzeff</footer>

        </div>
    );
}

export default Register;