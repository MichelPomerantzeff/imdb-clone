import '../css/Topbar.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import { useNavigate } from 'react-router-dom';

// import brazil from "../icons/brazil.png"
import uk from "../icons/uk.png"

import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"




function Topbar(props) {

    const baseUrl = "https://api.themoviedb.org/3/"
    const api = "api_key=454d6b5c326671cf654bb9a838b5f24f"

    const [user] = useAuthState(auth)

    const navigate = useNavigate()

    const [search, setSearch] = useState('')

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${baseUrl}search/multi?${api}&language=en-US&page=1&query=${search}`)
            .then(response => setData(response.data.results))
            .catch(err => console.log(err))
    }, [search])

    function logout() {
        signOut(auth)
    }

    console.log(user)


    return (
        <nav>
            <div className='topbar_container'>

                <div onClick={() => navigate("/")} className='topbar_left_section'>
                    <div className="logo">
                        <span>Movie App</span>
                        <LiveTvRoundedIcon className='tv_icon' />
                    </div>
                </div>

                <div className="topbar_center_section">
                    <div className="search_bar">
                        <input onChange={e => setSearch(e.target.value)} type="text" placeholder='Search' />
                        <button className='search_button'><SearchIcon /></button>
                        {
                            search &&
                            <div className="dropdown_box">
                                {
                                    data.map((movie, index) => {

                                        if (index < 10) {

                                            return (
                                                <div key={movie.id} className='searched_movie'>

                                                    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path || 'g8BBVlCrXB34GZJxczhdiRoYAeh.jpg'} `} alt='' />

                                                    <div className="searched_movie_elements">
                                                        <h4 className='searched_movie_title'>{movie.title || movie.name}</h4>
                                                        <span className='searched_movie_date'>{movie.release_date || movie.first_air_date}</span>
                                                        <div className='searched_movie_rating'>
                                                            <StarIcon className='star_icon' />
                                                            {movie.vote_average > 0 ? movie.vote_average : '--'}
                                                        </div>
                                                        <button className="add_to_watchlist">
                                                            <span>Add to Watchlist</span>
                                                        </button>
                                                    </div>

                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className="topbar_right_section">
                    <div className="lists">
                        <span onClick={() => navigate("/watchlist")} className='watchlist'>Watchlist</span>
                        <span onClick={() => navigate("/watched")} className='watched'>Watched</span>
                    </div>

                    {
                        user ?
                            <div className="loggedin">
                                <AccountCircleIcon />
                                <button onClick={logout}>Logout</button>
                            </div>
                            :
                            <div onClick={() => navigate("/login")} className="login">
                                <span>Sign in</span>
                            </div>
                    }

                    <div className="language">
                        {/* <img src={brazil} alt=""  /> */}
                        <img src={uk} alt="" />
                        <ArrowDropDownRoundedIcon />
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Topbar;