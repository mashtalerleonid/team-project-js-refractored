import { addFilmsOnPage } from './add-films-on-page';
import MovieApiService from './movie-service';
import settings from './settings';
import getRefs from './refs';
import {
  initHomePageSettings,
  setKeysToLocalStorage,
  checkFooterPosition,
} from './functions';
import { pagination } from './pagination';
import { libPageLoad } from './library';

const refs = getRefs();

refs.siteLogo.addEventListener('click', homePageLoad);
refs.navHomeBtn.addEventListener('click', homePageLoad);
refs.navLibBtn.addEventListener('click', libPageLoad);

export function homePageLoad() {
  const trendingApiService = new MovieApiService(settings.trendingUrl);

  pagination.reset(20000);

  setKeysToLocalStorage();

  initHomePageSettings(trendingApiService);

  checkFooterPosition();

  addFilmsOnPage(trendingApiService);
}

homePageLoad();
