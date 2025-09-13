const avaliacoesSlider = document.querySelector('.avaliacoes-slider');
const avaliacoesSlides = document.querySelectorAll('.avaliacoes-slide');
let avaliacoesIndex = 0;

function getSlidesPerView() {
    return window.innerWidth >= 1024 ? 3 : 1;
}

function avaliacoesShowSlide(i) {
    const slidesPerView = getSlidesPerView();
    const maxIndex = Math.max(0, avaliacoesSlides.length - slidesPerView);

    if (i < 0) avaliacoesIndex = maxIndex;
    else if (i > maxIndex) avaliacoesIndex = 0;
    else avaliacoesIndex = i;

    const slide = avaliacoesSlides[0];
    const slideWidth = slide.offsetWidth + 24; // 24px gap (ajuste se necessário)
    avaliacoesSlider.style.transition = 'transform 0.5s';
    avaliacoesSlider.style.transform = `translateX(-${avaliacoesIndex * slideWidth}px)`;
}

function avaliacoesPrevSlide() {
    avaliacoesShowSlide(avaliacoesIndex - 1);
}

function avaliacoesNextSlide() {
    avaliacoesShowSlide(avaliacoesIndex + 1);
}

window.addEventListener('resize', () => {
    avaliacoesShowSlide(avaliacoesIndex);
});

// Touch events only on mobile
function isMobile() {
    return window.innerWidth < 900;
}

let startX = 0;
let currentTranslate = 0;
let isDragging = false;

const slider = avaliacoesSlider;
const slides = avaliacoesSlides;
const slideCount = slides.length;

if (isMobile()) {
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        currentTranslate = -avaliacoesIndex * slider.offsetWidth;
        slider.style.transition = 'none';
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        slider.style.transform = `translateX(${currentTranslate + diff}px)`;
    });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50 && avaliacoesIndex > 0) {
            avaliacoesPrevSlide();
        } else if (diff < -50 && avaliacoesIndex < slideCount - 1) {
            avaliacoesNextSlide();
        } else {
            avaliacoesShowSlide(avaliacoesIndex);
        }
        slider.style.transition = 'transform 0.5s';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    avaliacoesShowSlide(0);
});