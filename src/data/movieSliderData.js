const language = "en-US"

const movieSliders = [
    {
        title: language === "en-US" ? "Popular Movies" : 'Filmes Populares',
        type: "movie",
        query: "popular"
    },
    {
        title: language === "en-US" ? '"Popular TV Shows"' : 'Series Populares',
        type: "tv",
        query: "popular"
    },
    {
        title: language === "en-US" ? '"Top Rated TV Shows"' : 'Series Mais Bem Votadas',
        type: "tv",
        query: "top_rated"
    },
    {
        title: language === "en-US" ? '"Top Rated Movies"' : 'Filmes Mais Bem Votadas',
        type: "movie",
        query: "top_rated"
    },
]

export default movieSliders