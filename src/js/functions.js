import Notiflix from 'notiflix';
import genresData from '../json/genres.json';
import noPosterImg from '../images/poster/no-poster.jpg';
import cardsTpl from '../templates/cards.hbs';
import trailerTpl from '../templates/trailer.hbs';
import MovieApiService from './movie-service';
import getRefs from './refs';
import settings from './settings';
import { showOneFilm } from './one-card';
import {
  observer,
  checkedGenresArr,
  genresApiService,
} from './filter-by-genres';

const refs = getRefs();

//Показує завантаження
export function showLoading() {
  Notiflix.Loading.arrows('Loading...');
}

//Ховає завантаження
export function hideLoading() {
  Notiflix.Loading.remove('Loading...');
}

//Показує Notiflix
export function showNotiflixNotificationError(text) {
  Notiflix.Notify.failure(text.toUpperCase());
}

//Перевіряє, чи знайшло хоча б один фільм
export function isTotalResults(apiService) {
  if (!apiService.totalResults) {
    refs.notification.classList.add('is-visible');
    refs.paginationContainer.classList.add('visually-hidden');
    hideLoading();
    return false;
  }
  return true;
}

// Перевіряє коректність даних, що прийшли з бекенду, підлаштовує їх під шаблон
export function checkFilmData(film) {
  // fetchedMoviesData.forEach(film => {
  checkPoster(film);

  checkTitle(film);

  checkDate(film);

  checkGenres(film);
  // });
}

//Перевіряє постер
export function checkPoster(film) {
  film.poster_path = film.poster_path
    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
    : noPosterImg;
}

//Перевіряє заголовок
function checkTitle(film) {
  if (!film.title) {
    film.title = film.name;
  }
}

//Перевіряє дату
function checkDate(film) {
  film.year = film.release_date
    ? film.release_date.split('-')[0]
    : new Date().getFullYear();
}

//Перевіряє жанри
function checkGenres(film) {
  film.genre_names = makeFilteredStringFromGenres(film.genre_ids);
}

// Повертає рядок з потрібною кількістю жанрів
function makeFilteredStringFromGenres(genresIdArr) {
  if (!genresIdArr) {
    return;
  }

  const allGenresNameArr = makeGenresNameArr(genresIdArr);

  const filteredString = checkGenresCount(allGenresNameArr);

  return filteredString;
}

//Робить масив з іменами всіх жанрів
function makeGenresNameArr(genresIdArr) {
  const arr = [];
  genresIdArr.forEach(i => {
    const name = findGenrNameById(i);
    if (name) {
      arr.push(name);
    }
  });
  return arr;
}

// Якщо жанрів 1-3, то повертає їх всі, а якщо жанрів 4-..., то повертає лише два і "Others", якщо немає жанрів, то повертає "Others". Повертає рядок.
function checkGenresCount(nameArr) {
  if (nameArr.length > 3 || nameArr.length === 0) {
    const arr = nameArr.slice(0, 2);
    arr.push('Others');
    return arr.join(', ');
  } else {
    return nameArr.join(', ');
  }
}

// Пошук жанру по id, повертає ім'я жанру
function findGenrNameById(id) {
  const genr = genresData.find(el => el.id === id);
  if (!genr) {
    return;
  }
  return genr.name;
}

// Перевіряє позицію футер
export function checkFooterPosition() {
  if (refs.cardsContainer.scrollHeight < window.innerHeight - 320) {
    refs.footer.classList.add('fixed-footer');
  } else {
    refs.footer.classList.remove('fixed-footer');
  }
}

// Рендерить розмітку
export function renderMarkup(container, markup) {
  container.insertAdjacentHTML('beforeend', markup);
}

// Добавляє event listener на карточки
export function addListenersToCards(selector) {
  const cards = document.querySelectorAll(selector);
  cards.forEach(el => {
    el.addEventListener('click', showOneFilm);
  });
}

// Встановлює початкові настройки домашньої сторінки
export function initHomePageSettings(apiService) {
  refs.formContainer.classList.add('is-visible');
  refs.navLibBtn.classList.remove('site-nav__item--current');
  refs.navHomeBtn.classList.add('site-nav__item--current');
  refs.header.classList.replace('imgLibrary', 'imgHome');
  refs.paginationContainer.classList.remove('visually-hidden');
  refs.notification.classList.remove('is-visible');
  refs.genreBtnsContainer.classList.remove('visually-hidden');
  refs.sentinel.classList.add('visually-hidden');
  refs.libBtnsContainer.classList.add('transform');
  refs.genreBtnsContainer.classList.remove('visually-hidden');
  refs.footer.classList.remove('fixed-footer');

  refs.cardsContainer.innerHTML = '';
  refs.paginationContainer.dataset.fetchtype = settings.trendingUrl;
  refs.cardsContainer.dataset.page = 'home';
  refs.searchForminput.value = '';

  apiService.query = '';
  apiService.page = 1;
  genresApiService.page = 1;

  observer.unobserve(refs.sentinel);

  refs.genreBtns.forEach(e => {
    e.checked = false;
  });

  checkedGenresArr.splice(0, checkedGenresArr.length);
}

// Встановлює початкові настройки бібліотеки
export function initLibraryPageSettings() {
  refs.formContainer.classList.remove('is-visible');
  refs.notification.classList.remove('is-visible');
  refs.libBtnsContainer.classList.remove('transform');
  refs.navHomeBtn.classList.remove('site-nav__item--current');
  refs.navLibBtn.classList.add('site-nav__item--current');
  refs.header.classList.replace('imgHome', 'imgLibrary');
  refs.cardsContainer.innerHTML = '';
  refs.paginationContainer.classList.add('visually-hidden');
  refs.cardsContainer.dataset.page = 'library';
  refs.watchedBtn.classList.add('btn-is-active');
  refs.queueBtn.classList.remove('btn-is-active');
  refs.genreBtnsContainer.classList.add('visually-hidden');
  refs.sentinel.classList.add('visually-hidden');

  observer.unobserve(refs.sentinel);

  checkFooterPosition();
}

// Закриває модалку при натисканні на Esc
export function onKeyDown(e) {
  if (!e.code === 'Escape') {
    return;
  }
  closeModal();
}

//  Закриває модалку при клацанні на хрестик чи backdrop
export function onModalClick(e) {
  if (
    e.target.classList.contains('backdrop') ||
    e.target.classList.contains('modal--close')
  ) {
    closeModal();
  }
}

//  Закриває модалку
function closeModal() {
  window.removeEventListener('keydown', onKeyDown);
  document.body.classList.remove('backdrop-is-open');
  refs.backdrop.classList.add('visually-hidden');
  refs.modalCard.innerHTML = '';
}

// Встановлює ключі в LocalStorage, якщо їх ще немає
export function setKeysToLocalStorage() {
  if (!localStorage.getItem('watched')) {
    localStorage.setItem('watched', JSON.stringify([]));
  }

  if (!localStorage.getItem('queue')) {
    localStorage.setItem('queue', JSON.stringify([]));
  }
}

// Записує в localStorage
export function writeToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Зчитує з localStorage
export function readFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Встановлює текст на кнопках залежно від того, чи є фільм у localStorage
export function checkBtnText(btn, fetchedMovie) {
  if (isFilmInStorage(btn.dataset.key, fetchedMovie.id)) {
    changeBtnText(
      btn,
      settings.removeWatchedBtnText,
      settings.removeQueueBtnText,
      'remove',
    );

    btn.classList.add('modal-btns-active');
  } else {
    changeBtnText(
      btn,
      settings.addWatchedBtnText,
      settings.addQueueBtnText,
      'add',
    );

    btn.classList.remove('modal-btns-active');
  }
}

// Змінює текс на кнопці
function changeBtnText(btn, watchedText, queueText, status) {
  btn.textContent = btn.dataset.key === 'watched' ? watchedText : queueText;
  btn.dataset.status = status;
}

// Перевіряє, чи є фільм у localStorage
export function isFilmInStorage(key, id) {
  const filmsArr = readFromLocalStorage(key);

  return filmsArr.some(e => e.id == id);
}

// Внутрішня функція для колбеків кнопок watched i queue
export function innerAddBtns(key, target, fetchedMovie) {
  const filmsArr = readFromLocalStorage(key);

  if (target.dataset.status === 'add') {
    filmsArr.push(fetchedMovie);

    writeToLocalStorage(key, filmsArr);

    changeBtnText(
      target,
      settings.removeWatchedBtnText,
      settings.removeQueueBtnText,
      'remove',
    );

    target.classList.add('modal-btns-active');
  } else {
    const idx = filmsArr.findIndex(e => e.id === fetchedMovie.id);

    filmsArr.splice(idx, 1);

    writeToLocalStorage(key, filmsArr);

    changeBtnText(
      target,
      settings.addWatchedBtnText,
      settings.addQueueBtnText,
      'add',
    );

    target.classList.remove('modal-btns-active');
  }

  if (refs.cardsContainer.dataset.page === key) {
    renderAllStorage(key);

    checkFooterPosition();
  }
}

// Внутрішня функція для колбеку кнопки трейлера
export async function innerShowTrailer(fetchedMovie, trailerContainer, modal) {
  try {
    const trailerApiService = new MovieApiService(
      `/movie/${fetchedMovie.id}/videos`,
    );

    showLoading();

    const fetchedTrailer = await trailerApiService.fetchFilms();

    hideLoading();

    fetchedTrailer.sourse = `https://www.youtube.com/embed/${fetchedTrailer.results[0].key}`;

    trailerContainer.innerHTML = trailerTpl(fetchedTrailer);
    trailerContainer.classList.remove('visually-hidden');

    modal.classList.add('trailer-is-open');
  } catch (error) {
    console.log(error);

    hideLoading();

    showNotiflixNotificationError('Film not found');
  }
}

// Рендер всіх фільмів з localStorage
export function renderAllStorage(key) {
  const filmsArr = readFromLocalStorage(key);

  refs.cardsContainer.innerHTML = cardsTpl(filmsArr);
  addListenersToCards('.card__item');
}

// Повертає один фільм з localStorage по id
export function getFilmFromLocalStorageById(key, idx) {
  const films = readFromLocalStorage(key);
  const filmToShow = films.find(e => e.id == idx);
  return filmToShow;
}

// Фільтрує фільми, у яких є вибрані жанри
export function filterMovies(fetchedMovies, genres) {
  let filteredMovies = [];

  fetchedMovies.forEach(film => {
    if (!film.genre_ids) {
      return [];
    }
    if (genres.every(el => film.genre_ids.includes(el))) {
      filteredMovies.push(film);
    }
  });

  return filteredMovies;
}
