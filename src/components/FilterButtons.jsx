import { ButtonGroup, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import PropTypes from "prop-types";


export default function FilterButtons({ getFilteredContent }) {

    const [selectedContent, setSelectedContent] = useState('All');

    const handleFilterContent = e => setSelectedContent(e.target.value);

    useEffect(() => {
        getFilteredContent(selectedContent)
    }, [selectedContent])

    return (
        <ButtonGroup
            style={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Button
                value="Movies"
                onClick={handleFilterContent}
                sx={{
                    border: "solid 2px #fff",
                    py: 1.2, px: 2.5,
                    background: selectedContent === "Movies" ? "#ffffff40" : "",
                    color: "#fff",
                    fontWeight: selectedContent === "Movies" ? "600" : "",
                    '&:hover': {
                        border: "solid 2px #fff",
                        background: selectedContent === "Movies" ? "#ffffff40" : "#ffffff25",
                    },
                }}
            >
                Movies
            </Button>
            <Button
                value="All"
                onClick={handleFilterContent}
                sx={{
                    border: "solid 2px #fff",
                    py: 1.2, px: 2.5,
                    background: selectedContent === "All" ? "#ffffff40" : "",
                    color: "#fff",
                    fontWeight: selectedContent === "All" ? "600" : "",
                    '&:hover': {
                        border: "solid 2px #fff",
                        background: selectedContent === "All" ? "#ffffff40" : "#ffffff25",
                    },
                }}
            >
                All
            </Button>
            <Button
                value="Tv Shows"
                onClick={handleFilterContent}
                sx={{
                    border: "solid 2px #fff",
                    py: 1.2, px: 2.5,
                    background: selectedContent === "Tv Shows" ? "#ffffff40" : "",
                    color: "#fff",
                    fontWeight: selectedContent === "Tv Shows" ? "600" : "",
                    '&:hover': {
                        border: "solid 2px #fff",
                        background: selectedContent === "Tv Shows" ? "#ffffff40" : "#ffffff25",
                    },
                }}
            >
                Tv Shows
            </Button>
        </ButtonGroup>
    );
}

FilterButtons.propTypes = {
    getFilteredContent: PropTypes.func,
}
