import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

import '../css/Topbar.css';

import movieCover from '../images/movieCover.jpg';
import brazil from "../icons/brazil.png";
import uk from "../icons/uk.png";

import MovieInfoCard from './MovieInfoCard';

import axios from 'axios';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase"
import { doc, setDoc } from 'firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';
import { displayMovieInfo } from '../features/movieInfo';


import useGetData from '../hooks/useGetData';


function Topbar(props) {

    const baseUrl = "https://api.themoviedb.org/3/";
    const api = "454d6b5c326671cf654bb9a838b5f24f";
    const language = "en-US";

    const [data, setData] = useState([]);;
    const [search, setSearch] = useState('');
    const [flag, setFlag] = useState('english');
    const [isUserAccount, setIsUserAccount] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [searchMode, setSearchMode] = useState(false);

    const display = useSelector((state) => state.movieInfo.value.display);
    const watchlistLength = useSelector((state) => state.watchlistLength.value.length);
    const watchedLength = useSelector((state) => state.watchedLength.value.length);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    let userAccountRef = useRef();
    let languageRef = useRef();
    let disabled = false;

    // Costum hooks (fetch data from database)
    const { user, watchlistData, getWatchlistData, watchedData } = useGetData();


    // Fetch API on movie searching
    useEffect(() => {
        axios.get(`${baseUrl}search/multi?api_key=${api}&language=${language}&page=1&query=${search}`)
            .then(response => setData(response.data.results))
            .catch(err => console.log(err))
    }, [search])

    //Log user out
    function logout() {
        signOut(auth)
    }

    // Hide element if user clicks outside
    useEffect(() => {
        const isOutside = e => {
            !userAccountRef.current?.contains(e.target) && setIsUserAccount(false)
            !languageRef.current.contains(e.target) && setIsLanguageOpen(false)
        }
        document.addEventListener("click", isOutside)
        return () => document.removeEventListener("click", isOutside)
    })


    async function addToWatchlist(data, type) {
        await setDoc(doc(db, "users", user.email, "watchlist", data.original_title || data.original_name), {
            movieId: data.id,
            name: data.original_title || data.original_name,
            vote_average: data.vote_average,
            poster_path: data.poster_path,
            type: type,
        });
        getWatchlistData()
    }

    return (
        <nav>
            {
                display &&
                <MovieInfoCard />
            }
            <div className='topbar_container'>

                <div style={{ display: `${searchMode ? 'none' : 'flex'}` }} onClick={() => navigate("/")} className='topbar_left_section'>
                    <div className="logo">
                        <span>Movie App</span>
                        <LiveTvRoundedIcon className='tv_icon' />
                    </div>
                </div>

                <div className="topbar_center_section">
                    <div className="search_bar">

                        <input
                            onChange={e => {
                                setTimeout(() => setSearch(e.target.value), 500)
                            }}
                            onFocus={() => setIsSearchBarOpen(true)}
                            onBlur={() => setTimeout(() => setIsSearchBarOpen(false), 200)}
                            type="text" placeholder='Search'
                            className='search_bar_input_desktop'
                        />
                        <button className='search_button_off'><SearchIcon /></button>

                        <input
                            onChange={e => {
                                setTimeout(() => setSearch(e.target.value), 500)
                            }}
                            onFocus={() => setIsSearchBarOpen(true)}
                            onBlur={() => setTimeout(() => setIsSearchBarOpen(false), 200)}
                            type="text" placeholder='Search'
                            className='search_bar_input_mobile'
                            style={{ display: `${!searchMode ? 'none' : 'flex'}` }}
                        />
                        <button onClick={() => setSearchMode(prev => !prev)} className='search_button_on'>
                            {
                                searchMode ? <ClearRoundedIcon /> : <SearchIcon />
                            }
                        </button>

                        {
                            search && isSearchBarOpen &&
                            <div className="search_bar_dropdown_box">
                                {
                                    data.map((movie, index) => {

                                        let movieId = movie.id

                                        // Check if movie is on watchlist/watched
                                        const isOnWatchlist = watchlistData.find(movie => {
                                            return movieId === movie.movieId
                                        })
                                        const isOnWatched = watchedData.find(movie => {
                                            return movieId === movie.movieId
                                        })
                                        isOnWatchlist || isOnWatched ? disabled = true : disabled = false

                                        if (index < 10) {

                                            return (
                                                <div
                                                    key={movie.id}
                                                    className='searched_movie'
                                                >
                                                    <div
                                                        onClick={() => {
                                                            dispatch(displayMovieInfo({ data: movie, type: movie.media_type, display: true }));
                                                        }}
                                                        className='searched_movie_wrapper'>
                                                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : movieCover} alt='' />

                                                        <div className="searched_movie_elements">
                                                            <h4 className='searched_movie_title'>{movie.title || movie.name}</h4>
                                                            <span className='searched_movie_date'>{movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || 'N/A'}</span>
                                                            <div className='searched_movie_rating'>
                                                                <StarIcon className='star_icon' />
                                                                {movie.vote_average || '--'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={(() => {
                                                            if (user) {
                                                                addToWatchlist(movie, movie.media_type)
                                                            } else {
                                                                alert("Sign in and start creating your wathlist")
                                                            }
                                                        })}
                                                        className="add_movie"
                                                        disabled={disabled}
                                                        style={{
                                                            background: `${disabled && '#cccccc1d'}`,
                                                            color: `${disabled && '#cccccc1d'}`,
                                                            pointerEvents: `${disabled && 'none'}`,
                                                            margin: '0 10px 10px 10px'
                                                        }}
                                                    >
                                                        <div><AddRoundedIcon /> Watchlist</div>
                                                    </button>

                                                </div>
                                            )
                                        }
                                        return ''
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>

                <div style={{ display: `${searchMode ? 'none' : 'flex'}` }} className="topbar_right_section">
                    <div className="lists">
                        <div onClick={() => navigate("/watchlist")} className='watchlist'>
                            Watchlist
                            {
                                watchlistLength > 0 &&
                                <sup className='whatchlist_quantity'>{watchlistLength}</sup>
                            }
                        </div>
                        <div onClick={() => navigate("/watched")} className='watched'>
                            Watched
                            {
                                watchedLength > 0 &&
                                <sup className='whatchlist_quantity'>{watchedLength}</sup>
                            }
                        </div>
                    </div>

                    {
                        user ?
                            <div onClick={() => setIsUserAccount(prev => !prev)} ref={userAccountRef} className="loggedin">
                                <AccountCircleIcon className='userIcon' />
                                <span>{user && user.email} <ArrowDropDownRoundedIcon /></span>


                                {
                                    isUserAccount &&

                                    <div className="loggedin_dropdown_box">
                                        <div onClick={() => navigate("/watchlist")}>
                                            Watchlist
                                            {
                                                watchlistLength > 0 &&
                                                <sup className='whatchlist_quantity'>{watchlistLength}</sup>
                                            }
                                        </div>
                                        <div onClick={() => navigate("/watched")}>
                                            Watched
                                            {
                                                watchedLength > 0 &&
                                                <sup className='whatchlist_quantity'>{watchedLength}</sup>
                                            }
                                        </div>
                                        <div
                                            onClick={() => {
                                                logout()
                                                navigate("/login")
                                            }}
                                        >Sign out</div>
                                        <div >
                                            <button style={{ color: "red" }}>Delete Account</button>
                                        </div>
                                    </div>
                                }
                            </div>
                            :
                            <div onClick={() => navigate("/login")} className="login">
                                <span>Sign in</span>
                            </div>
                    }

                    <div onClick={() => setIsLanguageOpen(prev => !prev)} ref={languageRef} className="language">
                        {flag === "portuguese" && <img src={brazil} alt="" />}
                        {flag === "english" && <img src={uk} alt="" />}
                        <ArrowDropDownRoundedIcon />

                        {
                            isLanguageOpen &&

                            <div className="language_dropdown_box">
                                <div onClick={() => setFlag('english')}>
                                    English (United Kingdom)
                                </div>

                                <div onClick={() => setFlag('portuguese')}>
                                    Português (Brasil)
                                </div>

                            </div>
                        }

                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Topbar;