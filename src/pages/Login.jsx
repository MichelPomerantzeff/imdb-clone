import { useState } from 'react';
import '../css/Login.css'
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import { useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const language = useSelector((state) => state.languageToggle.value.language);

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
        <>
        <Helmet>
            <title>Login page for signing into your account</title>
            <meta name="description" content="Sign in to your Movie App account to access your favourite movies and TV shows" />
            <link rel="canonical" href="/login" />
        </Helmet>
            <div className='login_container'>

                <div className="login_wrapper">

                    <div onClick={() => navigate("/")} className="login_logo">
                        <span>Movie App</span>
                        <LiveTvRoundedIcon className='login_tv_icon' />
                    </div>


                    <form className='login_box'>
                        <h2>
                            {
                                language === "en-US" ? 'Sign in' : 'Entrar'
                            }
                        </h2>
                        <div className='login_input_container'>
                            <label>Email</label>
                            <input onChange={e => setEmail(e.target.value)} className='email' type="email" placeholder='Email' />
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
                        <button onClick={signIn} className='signIn_button'>
                            {
                                language === "en-US" ? 'Sign in' : 'Entrar'
                            }
                        </button>
                        <button onClick={() => navigate("/register")} className='to_signUp_button'>
                            {
                                language === "en-US" ? 'Create an account' : 'Criar conta'
                            }
                        </button>
                        <p className='forgot_password'>
                            {
                                language === "en-US" ? 'Forgot password' : 'Esqueci a senha'
                            }
                        </p>
                    </form>
                </div>

                <Footer />

            </div>
        </>
    );
}

export default Login;