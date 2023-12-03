import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export async function getData(type, query, language, page) {
  const { data } = await axios.get(`${BASE_URL}/${type}/${query}`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      language: language,
      page: page,
    },
  });
  return data.results;
}



