import {
  initLibraryPageSettings,
  renderAllStorage,
  checkFooterPosition,
} from './functions';
import getRefs from './refs';

const refs = getRefs();

export function libPageLoad() {
  initLibraryPageSettings();

  renderAllStorage(refs.watchedBtn.dataset.key);
  refs.cardsContainer.dataset.page = refs.watchedBtn.dataset.key;

  checkFooterPosition();
}

refs.watchedBtn.addEventListener('click', getStorage);
refs.queueBtn.addEventListener('click', getStorage);

function getStorage(e) {
  refs.watchedBtn.classList.toggle('btn-is-active');
  refs.queueBtn.classList.toggle('btn-is-active');

  renderAllStorage(e.target.dataset.key);
  refs.cardsContainer.dataset.page = e.target.dataset.key;

  checkFooterPosition();
}
