import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export async function getSearchData(type, language, page, query) {
  const { data } = await axios.get(`${BASE_URL}/${type}`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      language: language,
      page: page,
      query: query,
    },
  });
  return data.results;
}



