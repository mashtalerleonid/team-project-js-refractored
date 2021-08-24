import MovieApiService from './movie-service';
import getRefs from './refs';
import settings from './settings';
import { addFilteredFilms } from './add-filtered-films';
import { addFilmsOnPage } from './add-films-on-page';
import { pagination } from './pagination';
import { checkFooterPosition } from './functions';

const refs = getRefs();

let showMore = true;

const optionsObserver = { rootMargin: '10px' };
export const observer = new IntersectionObserver(onEntry, optionsObserver);
export let checkedGenresArr = [];

export const genresApiService = new MovieApiService(
  refs.paginationContainer.dataset.fetchtype,
);

refs.genreBtnsContainer.addEventListener('change', onHendleBtn);

async function onHendleBtn(e) {
  refs.sentinel.classList.add('visually-hidden');
  genresApiService.page = 1;
  showMore = true;

  if (refs.searchForm.elements.searchQuery.value) {
    genresApiService.query = refs.searchForm.elements.searchQuery.value;
    refs.paginationContainer.dataset.fetchtype = settings.searchUrl;
  } else {
    refs.paginationContainer.dataset.fetchtype = settings.trendingUrl;
  }

  if (e.target.checked) {
    checkedGenresArr.push(Number(e.target.value));
  } else {
    const idx = checkedGenresArr.findIndex(el => el === Number(e.target.value));
    checkedGenresArr.splice(idx, 1);
  }

  if (checkedGenresArr.length) {
    observer.observe(refs.sentinel);
    refs.cardsContainer.innerHTML = '';
    checkFooterPosition();
    refs.paginationContainer.classList.add('visually-hidden');
    genresApiService.url = refs.paginationContainer.dataset.fetchtype;
    genresApiService.page = 0;
  } else {
    refs.paginationContainer.classList.remove('visually-hidden');
    genresApiService.url = refs.paginationContainer.dataset.fetchtype;
    observer.unobserve(refs.sentinel);
    refs.cardsContainer.innerHTML = '';
    await addFilmsOnPage(genresApiService);
    pagination.reset(genresApiService.totalResults);
  }
}

// Слідкує, коли закінчаться фільми
export function checkImagesCount(apiService) {
  if (apiService.page >= apiService.totalPages) {
    refs.sentinel.classList.remove('visually-hidden');
    checkFooterPosition();

    showMore = false;
  } else {
    showMore = true;
  }
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && showMore) {
      genresApiService.page += 1;
      addFilteredFilms(genresApiService, checkedGenresArr);
    }
  });
}
