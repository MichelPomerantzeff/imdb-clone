import { useEffect } from "react"
import { useSelector } from "react-redux";

export default function useDisableScroll() {

    const scroll = useSelector((state) => state.movieInfo.value.scroll);

    // Set scroll state
    useEffect(() => {
        if (!scroll) document.body.style.overflowY = "hidden"
        return () => document.body.style.overflowY = "unset"
    }, [scroll])
}