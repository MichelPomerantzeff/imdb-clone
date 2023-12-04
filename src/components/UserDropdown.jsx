import '../css/UserDropdown.css'
import useGetData from '../hooks/useGetData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from "react";
import { useRef } from 'react';
import useEventListener from '../hooks/useEventListener';

export default function UserDropdown() {


  const navigate = useNavigate();
  const language = useSelector((state) => state.languageToggle.value.language);
  const watchlistLength = useSelector((state) => state.watchlistLength.value.length);
  const watchedLength = useSelector((state) => state.watchedLength.value.length);

  const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
  let userAccountRef = useRef();

  // Costum hooks (fetch data from database)
  const { user } = useGetData();

  //Log user out
  function logout() {
    signOut(auth)
  }

  // Hide element if user clicks outside
  const isOutside = e => {
    !userAccountRef.current?.contains(e.target) && setIsUserAccountOpen(false)
  }
  useEventListener("click", isOutside)

  return (
    <>
      {
        user ?
          <div onClick={() => setIsUserAccountOpen(prev => !prev)} ref={userAccountRef} className="loggedin">
            <AccountCircleIcon className='userIcon' />
            <span>{user && user.email}</span>
            <ArrowDropDownRoundedIcon className={`${isUserAccountOpen ? "dd_open" : ""}`} />
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
    </>
  );
}