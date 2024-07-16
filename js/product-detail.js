let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveSlide(n) {
    slideIndex += n;
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1; // Chuyển đến hình ảnh cuối cùng nếu đi qua đầu
    }
    if (slideIndex >= totalSlides) {
        slideIndex = 0; // Trở lại hình ảnh đầu tiên nếu đi qua cuối cùng
    }
    const slideWidth = slides[0].clientWidth;
    const moveDistance = -slideIndex * slideWidth;
    document.querySelector('.slide-wrapper').style.transform = `translateX(${moveDistance}px)`;

    // Disable/enable Prev and Next buttons based on slideIndex
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    if (slideIndex === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    if (slideIndex >= totalSlides - 5) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}