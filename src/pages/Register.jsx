import { useState } from 'react';
import '../css/Login.css'
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import { useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

function Register() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")

    const language = useSelector((state) => state.languageToggle.value.language);

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
        <>
            <Helmet>
                <title>Registration page for creating a new account</title>
                <meta name="description" content="Create an account on Movie App to access your favourite movies and TV shows" />
                <link rel="canonical" href="/register" />
            </Helmet>
            <div className='login_container'>
                <title>Registration page for creating a new account</title>

                <div className="login_wrapper">

                    <div onClick={() => navigate("/")} className="login_logo">
                        <span>Movie App</span>
                        <LiveTvRoundedIcon className='login_tv_icon' />
                    </div>


                    <form className='login_box'>
                        <h2>
                            {
                                language === "en-US" ? 'Create an account' : 'Criar conta'
                            }
                        </h2>
                        <div className='login_input_container'>
                            <label>
                                {
                                    language === "en-US" ? 'Name' : 'Nome'
                                }
                            </label>
                            <input
                                /* onChange={e => setFirstName(e.target.value)} */
                                className='name'
                                type="text"
                                placeholder={language === "en-US" ? 'Full Name' : 'Nome completo'}
                            />
                        </div>

                        <div className='login_input_container'>
                            <label>Email</label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                className='email'
                                type="email"
                                placeholder='Email'
                            />
                        </div>

                        <div className='login_input_container'>
                            <label>Password</label>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                className='password'
                                type="password"
                                placeholder={language === "en-US" ? 'Password' : 'Senha'}
                            />
                        </div>
                        <div className='login_input_container'>
                            <label>
                                {
                                    language === "en-US" ? 'Re-enter password' : 'Repita senha'
                                }
                            </label>
                            <input
                                className='password'
                                type="password"
                                placeholder={language === "en-US" ? 'Passwords must match' : 'As 2 senhas devem ser identicas'}
                            />
                        </div>

                        <button onClick={signUp} className='signUp_button'>
                            {
                                language === "en-US" ? 'Create an account' : 'Criar conta'
                            }
                        </button>
                        <div className='to_signin'>
                            <p>
                                {
                                    language === "en-US" ? 'Already have an account ?' : 'Ja tem uma conta?'
                                }
                            </p>
                            <p onClick={() => navigate("/login")} className='to_signin_link'>
                                {
                                    language === "en-US" ? 'Sign in' : 'Entrar'
                                }
                            </p>
                        </div>
                    </form>
                </div>

                <Footer />

            </div>
        </>
    );
}

export default Register;