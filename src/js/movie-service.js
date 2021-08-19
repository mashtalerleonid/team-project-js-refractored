import axios from 'axios';
import settings from './settings';

// const API_KEY = 'b760a58e749aebdb345fb45ac26ad542';
// const BASE_URL = 'https://api.themoviedb.org/3';

export default class MovieApiService {
  constructor(currentUrl) {
    this.options = {
      method: 'get',
      baseURL: BASE_URL,
      url: currentUrl,
      params: {
        api_key: API_KEY,
        query: '',
        page: 1,
      },
    };
    this.totalResults = 0;
    this.totalPages = 0;
  }

  async fetchFilms() {
    const response = await axios.request(this.options);
    this.totalResults = response.data.totalResults;
    return response.data;
  }

  get query() {
    return this.options.params.query;
  }

  set query(newQuery) {
    this.options.params.query = newQuery;
  }

  get page() {
    return this.options.params.page;
  }

  set page(newPage) {
    this.options.params.page = newPage;
  }

  get url() {
    return this.options.url;
  }

  set url(newUrl) {
    this.options.url = newUrl;
  }
}
