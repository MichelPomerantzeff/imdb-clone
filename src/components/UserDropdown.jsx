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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function UserDropdown() {

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

                <div onClick={handleClickOpen} className='delete_account'>
                  {language === "en-US" ? 'DELETE ACCOUNT' : 'EXCLUIR CONTA'}
                </div>
              </div>
            }
          </div>
          :
          <div onClick={() => navigate("/login")} className="login">
            <span>{language === "en-US" ? 'Sign in' : 'Entrar'}</span>
          </div>
      }

      <ThemeProvider theme={darkTheme}>

        <CssBaseline />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            {"Delete account"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? 
              If you delete your account, you will lose your profile and and all your data.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
}