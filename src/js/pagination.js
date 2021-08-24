import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import MovieApiService from './movie-service';
import getRefs from './refs';
import settings from './settings';
import { addFilmsOnPage } from './add-films-on-page';

const refs = getRefs();

const paginApiService = new MovieApiService(settings.trendingUrl);

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
};

export const pagination = new Pagination('#tui-pagination-container', options);

pagination.on('afterMove', event => {
  refs.cardsContainer.innerHTML = '';
  refs.notification.classList.remove('is-visible');
  paginApiService.page = event.page;
  paginApiService.query = refs.searchForm.elements.searchQuery.value;
  paginApiService.url = refs.paginationContainer.dataset.fetchtype;
  addFilmsOnPage(paginApiService);
});
