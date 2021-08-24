import cardsTpl from '../templates/cards.hbs';
import getRefs from './refs';
import { checkImagesCount } from './filter-by-genres';
import {
  showLoading,
  hideLoading,
  checkFilmData,
  renderMarkup,
  addListenersToCards,
  filterMovies,
  checkFooterPosition,
} from './functions';

const refs = getRefs();

let filteredFetchedMovies = [];
let fetchedMovies = [];
let current = [];

export async function addFilteredFilms(apiService, genres) {
  try {
    showLoading();

    const fetchedMoviesData = await apiService.fetchFilms();

    apiService.totalResults = fetchedMoviesData.total_results;
    apiService.totalPages = fetchedMoviesData.total_pages;

    filteredFetchedMovies = [
      ...filterMovies(fetchedMoviesData.results, genres),
    ];

    while (
      filteredFetchedMovies.length < 4 &&
      fetchedMoviesData.total_pages >= apiService.page
    ) {
      apiService.page += 1;

      if (apiService.page > 100) {
        hideLoading();
        refs.sentinel.classList.remove('visually-hidden');
        checkFooterPosition();
        return;
      }

      const films = await apiService.fetchFilms();

      fetchedMovies = [...films.results];

      current = [...filterMovies(fetchedMovies, genres)];

      filteredFetchedMovies.push(...current);
    }

    filteredFetchedMovies.forEach(film => checkFilmData(film));

    hideLoading();

    renderMarkup(refs.cardsContainer, cardsTpl(filteredFetchedMovies));

    checkImagesCount(apiService);

    addListenersToCards('.card__item');

    checkFooterPosition();
  } catch (error) {
    console.log(error);

    hideLoading();
  }
}
