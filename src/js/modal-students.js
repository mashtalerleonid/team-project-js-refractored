const modalStudents = document.querySelector('#modal');
const modalOverlay = document.querySelector('#modal-overlay');
const closeBtn = document.querySelector('#close-button');
const openBtn = document.querySelector('#open-button');

openBtn.addEventListener('click', onOpenBtnClick);

modalOverlay.addEventListener('click', onCloseBtnClick);

function onOpenBtnClick() {
  modalStudents.classList.toggle('is-hidden');
  document.body.style.overflow = 'hidden';
  modalOverlay.classList.toggle('is-hidden');
  window.addEventListener('keydown', onKeyDown);
}

function onCloseBtnClick(e) {
  if (
    e.target.classList.contains('modal-overlay') ||
    e.target.classList.contains('modal--close')
  ) {
    modalStudents.classList.toggle('is-hidden');
    document.body.style.overflow = 'visible';
    modalOverlay.classList.toggle('is-hidden');
  }
}

function onKeyDown(e) {
  if (!e.code === 'Escape') {
    return;
  }
  modalStudents.classList.toggle('is-hidden');
  document.body.style.overflow = 'visible';
  modalOverlay.classList.toggle('is-hidden');
  window.removeEventListener('keydown', onKeyDown);
}
