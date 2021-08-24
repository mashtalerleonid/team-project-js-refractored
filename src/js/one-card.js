import MovieApiService from './movie-service';
import cardTpl from '../templates/modal-card';
import settings from './settings';
import getRefs from './refs';
import {
  showLoading,
  hideLoading,
  renderMarkup,
  showNotiflixNotificationError,
  onKeyDown,
  onModalClick,
  checkBtnText,
  innerAddBtns,
  innerShowTrailer,
  checkFilmData,
  isFilmInStorage,
  getFilmFromLocalStorageById,
} from './functions';

const refs = getRefs();

let fetchedMovie;

export async function showOneFilm(e) {
  try {
    if (
      isFilmInStorage(refs.watchedBtn.dataset.key, e.currentTarget.dataset.id)
    ) {
      fetchedMovie = getFilmFromLocalStorageById(
        refs.watchedBtn.dataset.key,
        e.currentTarget.dataset.id,
      );
    } else if (
      isFilmInStorage(refs.queueBtn.dataset.key, e.currentTarget.dataset.id)
    ) {
      fetchedMovie = getFilmFromLocalStorageById(
        refs.queueBtn.dataset.key,
        e.currentTarget.dataset.id,
      );
    } else {
      showLoading();

      const oneFilmApiService = new MovieApiService(
        `${settings.oneFilmUrl}${e.currentTarget.dataset.id}`,
      );

      fetchedMovie = await oneFilmApiService.fetchFilms();

      hideLoading();

      fetchedMovie.genre_ids = fetchedMovie.genres.map(e => e.id);

      checkFilmData(fetchedMovie);
    }

    refs.backdrop.classList.remove('visually-hidden');
    document.body.classList.add('backdrop-is-open');
    refs.backdrop.addEventListener('click', onModalClick);
    window.addEventListener('keydown', onKeyDown);

    renderMarkup(refs.modalCard, cardTpl(fetchedMovie));

    refs.addToWatchedBtn = document.querySelector('.modal-btns--watched');
    refs.addToQueueBtn = document.querySelector('.modal-btns--queue');
    refs.trailerBtn = document.querySelector('.trailer__icon');
    refs.trailerContainer = document.querySelector('.trailer__container');
    refs.trailerBtn = document.querySelector('.trailer__icon');
    refs.trailerContainer = document.querySelector('.trailer__container');

    refs.addToWatchedBtn.addEventListener('click', onAddBtns);
    refs.addToQueueBtn.addEventListener('click', onAddBtns);
    refs.trailerBtn.addEventListener('click', showTrailer);

    checkBtnText(refs.addToWatchedBtn, fetchedMovie);
    checkBtnText(refs.addToQueueBtn, fetchedMovie);

    function onAddBtns(e) {
      innerAddBtns(e.target.dataset.key, e.target, fetchedMovie);
    }

    function showTrailer(e) {
      innerShowTrailer(fetchedMovie, refs.trailerContainer, refs.modalCard);
    }
  } catch (error) {
    console.log(error);

    hideLoading();

    showNotiflixNotificationError('Film not found');
  }
}
