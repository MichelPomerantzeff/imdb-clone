import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovieDetails(id, language) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      append_to_response: "videos",
      language: language,
    },
  });
  return data;
}
