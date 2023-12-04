import { ButtonGroup, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from "prop-types";


export default function FilterButtons({ getFilteredValue }) {

    const [selectedContent, setSelectedContent] = useState('all');

    const handleFilterContent = e => {
        setSelectedContent(e.target.value)
    }

    useEffect(() => {
        getFilteredValue(selectedContent)
    }, [selectedContent])

    return (
        <ButtonGroup
            style={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Button
                value="movie"
                onClick={handleFilterContent}
                sx={{
                    border: "solid 1px #fff",
                    py: 1.2, px: 2.5,
                    background: selectedContent === "movie" ? "#ffffff25" : "",
                    color: "#fff",
                    fontWeight: selectedContent === "movie" ? "600" : "",
                    '&:hover': {
                        border: "solid 1px #fff",
                        background: selectedContent === "movie" ? "#ffffff25" : "#ffffff25",
                    },
                }}
            >
                Movies
            </Button>
            <Button
                value="all"
                onClick={handleFilterContent}
                sx={{
                    border: "solid 1px #fff",
                    py: 1.2, px: 2.5,
                    background: selectedContent === "all" ? "#ffffff25" : "",
                    color: "#fff",
                    fontWeight: selectedContent === "all" ? "600" : "",
                    '&:hover': {
                        border: "solid 1px #fff",
                        background: selectedContent === "all" ? "#ffffff25" : "#ffffff25",
                    },
                }}
            >
                All
            </Button>
            <Button
                value="tv"
                onClick={handleFilterContent}
                sx={{
                    border: "solid 1px #fff",
                    py: 1.2, px: 2.5,
                    background: selectedContent === "tv" ? "#ffffff25" : "",
                    color: "#fff",
                    fontWeight: selectedContent === "tv" ? "600" : "",
                    '&:hover': {
                        border: "solid 1px #fff",
                        background: selectedContent === "tv" ? "#ffffff25" : "#ffffff25",
                    },
                }}
            >
                Tv Shows
            </Button>
        </ButtonGroup>
    );
}

FilterButtons.propTypes = {
    getFilteredValue: PropTypes.func,
}
