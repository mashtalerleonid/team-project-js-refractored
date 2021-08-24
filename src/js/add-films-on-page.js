import cardsTpl from '../templates/cards.hbs';
import {
  showLoading,
  hideLoading,
  isTotalResults,
  checkFilmData,
  renderMarkup,
  addListenersToCards,
  checkFooterPosition,
} from './functions';

import getRefs from './refs';

const refs = getRefs();

export async function addFilmsOnPage(apiService) {
  try {
    apiService.url = refs.paginationContainer.dataset.fetchtype;

    showLoading();

    const fetchedMoviesData = await apiService.fetchFilms();

    apiService.totalResults = fetchedMoviesData.total_results;
    apiService.totalPages = fetchedMoviesData.total_pages;

    if (!isTotalResults(apiService)) {
      return;
    }

    refs.paginationContainer.classList.remove('visually-hidden');
    refs.paginationContainer.dataset.fetchtype = apiService.url;

    fetchedMoviesData.results.forEach(film => checkFilmData(film));

    hideLoading();

    renderMarkup(refs.cardsContainer, cardsTpl(fetchedMoviesData.results));

    checkFooterPosition();

    addListenersToCards('.card__item');
  } catch (error) {
    console.log(error);

    hideLoading();
  }
}
