var swiper1 = new Swiper(".mySwiper1", {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
        nextEl: "#CateSlide .swiper-button-next",
        prevEl: "#CateSlide .swiper-button-prev",
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
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
        nextEl: "#cateRoomSlide .swiper-button-next",
        prevEl: "#cateRoomSlide .swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        992: {
            slidesPerView: 3
        },
    },
});
var swiperEndow = new Swiper(".mySwiperEndow", {
    slidesPerView: 3,
    spaceBetween: 30,

    navigation: {
        nextEl: "#homeEndow .swiper-button-next",
        prevEl: "#homeEndow .swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        992: {
            slidesPerView: 3
        },
    },
});
var swiper2 = new Swiper(".mySwiper2", {
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



//tab
var swiperTab1 = new Swiper(".mySwiperTab1", {
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
var swiperTab2 = new Swiper(".mySwiperTab2", {
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
var swiperTab3 = new Swiper(".mySwiperTab3", {
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
var swiperTab4 = new Swiper(".mySwiperTab4", {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
        nextEl: "#Tab4 .swiper-button-next",
        prevEl: "#Tab4 .swiper-button-prev",
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