import MovieInfoCard from './MovieInfoCard';
import SearchBar from './SearchBar';
import '../css/Topbar.css';
import uk from "../icons/uk.png";
import brazil from "../icons/brazil.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../features/languageToggle';
import useGetData from '../hooks/useGetData';
import useEventListener from '../hooks/useEventListener';


function Topbar() {

    const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const display = useSelector((state) => state.movieInfo.value.display);
    const searchMode = useSelector((state) => state.searchBarToggle.value.searchMode);
    const watchlistLength = useSelector((state) => state.watchlistLength.value.length);
    const watchedLength = useSelector((state) => state.watchedLength.value.length);
    const language = useSelector((state) => state.languageToggle.value.language);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let userAccountRef = useRef();
    let languageRef = useRef();

    // Costum hooks (fetch data from database)
    const { user } = useGetData();

    //Log user out
    function logout() {
        signOut(auth)
    }

    // Hide element if user clicks outside
    const isOutside = e => {
        !userAccountRef.current?.contains(e.target) && setIsUserAccountOpen(false)
        !languageRef.current.contains(e.target) && setIsLanguageOpen(false)
    }
    useEventListener("click", isOutside)

    return (
        <nav>
            {display ? <MovieInfoCard /> : null}
            <div className='topbar_container'>

                {
                    !searchMode &&
                    <div onClick={() => navigate("/")} className='topbar_left_section'>
                        <div className="logo">
                            <span>Movie App</span>
                        </div>
                    </div>
                }

                <div className="topbar_center_section">
                    <SearchBar />
                </div>

                {
                    !searchMode &&
                    <div className="topbar_right_section">
                        <div className="lists">

                            <div onClick={() => navigate("/watchlist")} className='watchlist'>
                                {language === "en-US" ? 'Watchlist' : 'Assistir'}
                                {watchlistLength > 0 && <sup className='whatchlist_quantity'>{watchlistLength}</sup>}
                            </div>

                            <div onClick={() => navigate("/watched")} className='watched'>
                                {language === "en-US" ? 'Watched' : 'Assistidos'}
                                {watchedLength > 0 && <sup className='whatchlist_quantity'>{watchedLength}</sup>}
                            </div>
                        </div>

                        {
                            user ?
                                <div onClick={() => setIsUserAccountOpen(prev => !prev)} ref={userAccountRef} className="loggedin">
                                    <AccountCircleIcon className='userIcon' />
                                    <span>{user && user.email} <ArrowDropDownRoundedIcon className={`${isUserAccountOpen ? "dd_open" : ""}`}/></span>


                                    {
                                        isUserAccountOpen &&

                                        <div className="loggedin_dropdown_box">

                                            <div onClick={() => navigate("/watchlist")}>
                                                {language === "en-US" ? 'Watchlist' : 'Assistir'}
                                                {watchlistLength > 0 && <sup className='whatchlist_quantity'>{watchlistLength}</sup>}
                                            </div>

                                            <div onClick={() => navigate("/watched")}>
                                                {language === "en-US" ? 'Watched' : 'Assistidos'}
                                                {watchedLength > 0 && <sup className='whatchlist_quantity'>{watchedLength}</sup>}
                                            </div>

                                            <div
                                                onClick={() => {
                                                    logout()
                                                    navigate("/login")
                                                }}
                                            >
                                                {language === "en-US" ? 'Sign out' : 'Sair'}
                                            </div>
                                            <div >
                                                <button style={{ color: "red" }}>
                                                    {language === "en-US" ? 'Delete Account' : 'Excluir conta'}
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                <div onClick={() => navigate("/login")} className="login">
                                    <span>{language === "en-US" ? 'Sign in' : 'Entrar'}</span>
                                </div>
                        }

                        <div onClick={() => setIsLanguageOpen(prev => !prev)} ref={languageRef} className="language">
                            {language === "pt-BR" && <img src={brazil} alt="" />}
                            {language === "en-US" && <img src={uk} alt="" />}
                            <ArrowDropDownRoundedIcon className={`${isLanguageOpen ? "dd_open" : ""}`}/>

                            {
                                isLanguageOpen &&

                                <div className="language_dropdown_box">
                                    <div onClick={() => { dispatch(setLanguage({ language: "en-US" })); }}>
                                        English (United Kingdom)
                                    </div>

                                    <div onClick={() => { dispatch(setLanguage({ language: "pt-BR" })); }}>
                                        Português (Brasil)
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                }

            </div>
        </nav>
    );
}

export default Topbar;