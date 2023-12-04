import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "../config/firebase";

import { getWatchlistLength } from "../features/watchlistLength";
import { getWatchedLength } from "../features/watchedLength";

export default function useGetData() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  // Watchlist Data
  const [watchlistData, setWatchlistData] = useState([]);
  const [watchlistDataLoading, setWatchlistDataLoading] = useState(false);

  const getWatchlistData = async () => {
    try {
      if (user) {
        setWatchlistDataLoading(true);
        const docRef = doc(db, "users", user.email);
        const colRef = collection(docRef, "watchlist");
        const data = await getDocs(colRef);
        setWatchlistData(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWatchlistDataLoading(false);
    }
  };

  // Watched Data
  const [watchedData, setWatchedData] = useState([]);
  const [watchedDataLoading, setWatchedDataLoading] = useState(false);

  const getWatchedData = async () => {
    try {
      if (user) {
        setWatchedDataLoading(true);
        const docRef = doc(db, "users", user.email);
        const colRef = collection(docRef, "watched");
        const data = await getDocs(colRef);
        setWatchedData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWatchedDataLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getWatchlistLength({ length: watchlistData.length }));
    dispatch(getWatchedLength({ length: watchedData.length }));
  }, [watchlistData, watchedData]);

  useEffect(() => {
    getWatchlistData();
    getWatchedData();
  }, [user]);

  return {
    user,
    watchlistData,
    watchlistDataLoading,
    getWatchlistData,
    watchedData,
    watchedDataLoading,
    getWatchedData,
  };
}
