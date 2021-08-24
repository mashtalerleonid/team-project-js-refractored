import MovieApiService from './movie-service';
import settings from './settings';
import getRefs from './refs';
import { pagination } from './pagination';
import { addFilmsOnPage } from './add-films-on-page';
import { observer } from './filter-by-genres';
import { checkFooterPosition } from './functions';

const refs = getRefs();

const searchApiService = new MovieApiService(settings.searchUrl);

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  refs.notification.classList.remove('is-visible');
  refs.sentinel.classList.add('visually-hidden');

  searchApiService.query = e.currentTarget.elements.searchQuery.value;

  if (!searchApiService.query) {
    refs.notification.classList.add('is-visible');
    return;
  }

  observer.unobserve(sentinel);

  refs.paginationContainer.dataset.fetchtype = settings.searchUrl;

  searchApiService.page = 1;

  refs.cardsContainer.innerHTML = '';

  refs.genreBtns.forEach(e => {
    e.checked = false;
  });

  await addFilmsOnPage(searchApiService);

  pagination.reset(searchApiService.totalResults);

  checkFooterPosition();
}
