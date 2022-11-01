import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "../config/firebase";

import { getWatchlistLength } from '../features/watchlistLength';
import { getWatchedLength } from '../features/watchedLength';

export default function useGetData(name) {

    const [user] = useAuthState(auth)
    const dispatch = useDispatch()

    // Watchlist Data
    const [watchlistData, setWatchlistData] = useState([])

    const getWatchlistData = async () => {
        if (user) {
            const docRef = doc(db, "users", user.email);
            const colRef = collection(docRef, 'watchlist')
            const data = await getDocs(colRef);
            setWatchlistData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
    }

    // Watched Data
    const [watchedData, setWatchedData] = useState([])

    const getWatchedData = async () => {
        if (user) {
            const docRef = doc(db, "users", user.email);
            const colRef = collection(docRef, 'watched')
            const data = await getDocs(colRef);
            setWatchedData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
    }

    useEffect(() => {
        dispatch(getWatchlistLength({ length: watchlistData.length }));
        dispatch(getWatchedLength({ length: watchedData.length }));
    }, [watchlistData, watchedData])

    useEffect(() => {
        getWatchlistData()
        getWatchedData()
    }, [user])


    return { user, watchlistData, getWatchlistData, watchedData, getWatchedData }
}