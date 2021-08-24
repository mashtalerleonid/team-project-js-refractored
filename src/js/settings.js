import Notiflix from 'notiflix';
import vars from './variables';

export default {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: 'b760a58e749aebdb345fb45ac26ad542',
  trendingUrl: '/trending/movies/day',
  searchUrl: '/search/movie',
  oneFilmUrl: '/movie/',
  addWatchedBtnText: 'add to watched',
  removeWatchedBtnText: 'remove from watched',
  addQueueBtnText: 'add to queue',
  removeQueueBtnText: 'remove from queue',
};

Notiflix.Loading.init({
  svgColor: `${vars.accentColor}`,
  svgSize: '120px',
});
