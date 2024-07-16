
let slideIndex = 0;
// let slides = document.getElementsByClassName("slide");
let slides = document.querySelectorAll('#slider-home .slide');
let dots = document.getElementsByClassName("dot");
let isDown = false;
let startX;
let scrollLeft;

// Khởi tạo hiển thị slide đầu tiên
showSlides();

// Hàm hiển thị slide
function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = "translateX(-" + slideIndex + "00%)";
        slides[i].classList.remove("active");
    }
    slides[slideIndex].classList.add("active");

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }
    dots[slideIndex].classList.add("active-dot");
}

// Chuyển đổi slide trước
function prevSlide() {
    if (slideIndex > 0) {
        slideIndex--;
    } else {
        slideIndex = slides.length - 1;
    }
    showSlides();
}
function currentSlide(index) {
    slideIndex = index - 1;
    showSlides();
}

// Chuyển đổi slide kế tiếp
function nextSlide() {
    if (slideIndex < slides.length - 1) {
        slideIndex++;
    } else {
        slideIndex = 0;
    }
    showSlides();
}

// Bắt sự kiện khi bắt đầu kéo chuột
for (let i = 0; i < slides.length; i++) {
    slides[i].addEventListener('mousedown', (e) => {
        console.log("down");
        isDown = true;
        startX = e.pageX - slides[i].offsetLeft;
        scrollLeft = slides[i].scrollLeft;
    });

    slides[i].addEventListener('mouseleave', () => {
        isDown = false;
    });



    slides[i].addEventListener('mousemove', (e) => {
        const x = e.pageX - slides[i].offsetLeft;
        console.log(x);
        const walk = (x - startX) * 2; // Tốc độ di chuyển khi kéo chuột
        // nextSlide();
        console.log("move");
        if (!isDown) return;
        console.log("move2");
        e.preventDefault();
        // const x = e.pageX - slides[i].offsetLeft;
        // console.log(x);
        // const walk = (x - startX) * 2; // Tốc độ di chuyển khi kéo chuột
        // console.log(walk);

        slides[i].addEventListener('mouseup', () => {
            nextSlide();
            isDown = false;
        });
    });
}

// Tự động chuyển slide sau mỗi 5 giây
setInterval(nextSlide, 5000);


//endow slide
let slideIndex2 = 0;
const slides2 = document.querySelectorAll('.slide-endow');
const totalSlides2 = slides2.length;

function moveSlide(n) {
    slideIndex2 += n;
    if (slideIndex2 < 0) {
        slideIndex2 = totalSlides2 - 1; // Chuyển đến hình ảnh cuối cùng nếu đi qua đầu
    }
    if (slideIndex2 >= totalSlides2) {
        slideIndex2 = 0; // Trở lại hình ảnh đầu tiên nếu đi qua cuối cùng
    }
    const slideWidth2 = slides2[0].clientWidth;
    const moveDistance2 = -slideIndex2 * slideWidth2;
    document.querySelector('.slide-wrapper').style.transform = `translateX(${moveDistance2}px)`;

    // Disable/enable Prev and Next buttons based on slideIndex
    const prevBtn2 = document.querySelector('#homeEndow .prev');
    const nextBtn2 = document.querySelector('#homeEndow .next');
    if (slideIndex2 === 0) {
        prevBtn2.disabled = true;
    } else {
        prevBtn2.disabled = false;
    }
    if (slideIndex2 >= totalSlides2 - 3) {
        nextBtn2.disabled = true;
    } else {
        nextBtn2.disabled = false;
    }
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: "auto"
        },
        992: {
            slidesPerView: 3
        },
    },
});
var swiper1 = new Swiper(".mySwiper1", {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
        nextEl: "#Tab1 .swiper-button-next",
        prevEl: "#Tab1 .swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        992: {
            slidesPerView: 4
        },
    },
});
var swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
        nextEl: "#Tab2 .swiper-button-next",
        prevEl: "#Tab2 .swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        992: {
            slidesPerView: 4
        },
    },
});
var swiper3 = new Swiper(".mySwiper3", {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
        nextEl: "#Tab3 .swiper-button-next",
        prevEl: "#Tab3 .swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        992: {
            slidesPerView: 4
        },
    },
});


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Open the default tab on page load
document.querySelector('.tablinks').click();