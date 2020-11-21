// 1.	Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2.	Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3.	Открытие модального окна по клику на элементе галереи.
// 4.	Подмена значения атрибута src элемента img.lightbox__image.
// 5.	Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6.	Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.


// импортируем массив изображений
import galleryItems from './gallery-items.js';
console.log(galleryItems);


const galleryRef = document.querySelector('.js-gallery');
// console.log(galleryRef);
const overlayRef = document.querySelector('.js-lightbox');
// console.log(overlayRef);
const closeOverlayBtnRef = document.querySelector('button[data-action="close-lightbox"]');
// console.log(closeOverlayBtnRef);
const lightBoxImage = document.querySelector('.lightbox__image');
// console.log(lightBoxImage);


//создаем разметки по массиву данных и предоставленному шаблону
galleryRef.insertAdjacentHTML(
  'beforeend',
  galleryItems
    .map(
      ({preview, original, description}) =>
        `<li><a class="gallery__link" href='${original}'><img class='gallery__image' src='${preview}' data-source= '${original}' alt='${description}'></a></li>`,
    )
    .join(''),
);
galleryRef.classList.add('gallery__item');

// реализуем делегирование на галерее ul.js-gallery, получение url большого изображения 

galleryRef.addEventListener('click', onItemClick);
closeOverlayBtnRef.addEventListener('click', closeModalClick);

// открытие модального окна по клику на элементе галереи
function onItemClick(e) {
  e.preventDefault();
  console.log(e.target);

  // const tagImg = e.target;

  console.log(e.target.nodeName);

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  // tagImg.classList.add('is-open');


// подменяем значения атрибута src элемента img.lightbox__image
  lightBoxImage.setAttribute('src', e.target.dataset.source);
  lightBoxImage.setAttribute('alt', e.target.alt);
  console.log(e.target.dataset.source);
  
  openModal();
}
  
// закрытие модального окна по клику на кнопку button[data-action="close-lightbox"] и очистка значения атрибута src элемента img.lightbox__image

function closeModalClick() {
  overlayRef.classList.toggle('is-open');
  lightBoxImage.setAttribute('src', '#');
  lightBoxImage.setAttribute('alt', '#');
}

function openModal() {
  overlayRef.classList.toggle('is-open');
}