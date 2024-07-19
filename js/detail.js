var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,

    navigation: {
        nextEl: ".detailSlideRoom .swiper-button-next",
        prevEl: ".detailSlideRoom .swiper-button-prev",
    },
    loop: true
});
var swiper1 = new Swiper(".mySwiperRoom", {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
        nextEl: "#cateRoomSlide .swiper-button-next",
        prevEl: "#cateRoomSlide .swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
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
const detailRoomTab = document.querySelector('.detailRoomTab');
const rect = detailRoomTab.getBoundingClientRect();
const detailRoomTabWidth = detailRoomTab.offsetWidth;
const distanceToTop = rect.top - 130;
document.addEventListener('scroll', function() {


    const footerElement = document.getElementById('DetailRoomDataBottom');
    const rectFooterElement= footerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const detailRoomTabHeight = detailRoomTab.offsetHeight;

// Lấy khoảng cách từ đỉnh của phần tử đến đỉnh của cửa sổ trình duyệt

    var scrollTop = window.scrollY || window.scrollTop;
    console.log(detailRoomTabHeight);

    if (scrollTop > distanceToTop) {
        if (rectFooterElement.top -130 <= detailRoomTabHeight ){
            detailRoomTab.style.position = "";
            detailRoomTab.style.top = 0;
        }else{
            detailRoomTab.style.width = detailRoomTabWidth+"px";
            detailRoomTab.style.position = "fixed";
            detailRoomTab.style.top =  "130px";
        }


    } else {
        detailRoomTab.style.position = "";
        detailRoomTab.style.top = 0;
    }
});