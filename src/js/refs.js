export default function getRefs(){
  return {
    siteLogo: document.querySelector('.site-nav__logo'),
    navBtnsContainer: document.querySelector('.site-nav__list'),
    navHomeBtn: document.querySelector('.home-js'),
    navLibBtn: document.querySelector('.library-js'),
    formContainer: document.querySelector('.form'),
    searchForm: document.querySelector('#search-form'),
    searchForminput: document.querySelector('.search-form__input'),
    searchFormTitle: document.querySelector('.search-form__title'),
    notification: document.querySelector('.notification'),
    libBtnsContainer: document.querySelector('.overlay'),
    header: document.querySelector('.header'),
    paginationContainer: document.querySelector('#tui-pagination-container'),
    cardsContainer: document.querySelector('#cards-container'),
    cardWatchedBtn: document.querySelector('.js-btn-watched'),
    cardQueueBtn: document.querySelector('.js-btn-queue'),
    sentinelContainer: document.querySelector('.sentinel__container'),
    sentinel: document.querySelector('#sentinel'),
    genreBtns: document.querySelectorAll('.genres__checkbox'),
    genreBtnsContainer: document.querySelector('.genres__container'),
    backdrop: document.querySelector('.backdrop'),
    modalCard: document.querySelector('.modal-card'),
  }
}