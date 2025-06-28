let index = 0;

function nextSlide() {
  const slide = document.querySelector('.carousel-slide');
  const items = document.querySelectorAll('.carousel-item');
  if (index < items.length - 1) {
    index++;
  } else {
    index = 0;
  }
  slide.style.transform = translateX(-$(index * 300),px);
}

function prevSlide() {
  const slide = document.querySelector('.carousel-slide');
  const items = document.querySelectorAll('.carousel-item');
  if (index > 0) {
    index--;
  } else {
    index = items.length - 1;
  }
  slide.style.transform = translateX(-$(index * 300),px);
}