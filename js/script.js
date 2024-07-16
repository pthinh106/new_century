//menu mobile

function openNav() {
    var elements = document.querySelectorAll(".header-mid");
    elements.forEach((element, index) => {
        element.classList.add("current");
    });
}
function closeNav() {
    var elements = document.querySelectorAll(".header-mid");
    elements.forEach((element, index) => {
        element.classList.remove("current");
    });
}
document.querySelectorAll('#nav li .open_mnu').forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        if (this.classList.contains('current')) {
            var parentUl = this.closest('li, .open_mnu');
                parentUl.classList.remove('current');

            var nextEle = this.nextElementSibling;
            if ((nextEle && nextEle.tagName === 'UL') || (nextEle && nextEle.classList.contains('mega-content'))) {
                console.log("aaaa");

                var currentHeight = nextEle.clientHeight;

                nextEle.style.height = currentHeight + 'px';
                nextEle.addEventListener('transitionend', function() {
                    nextEle.style.height = '0'; // Đặt lại height thành auto sau khi mở rộng hoàn tất
                }, { once: true });
                nextEle.querySelectorAll('li, .open_mnu').forEach(function(el) {
                    el.classList.remove('current');
                    var nextEle2 = el.nextElementSibling;
                    if ((nextEle2 && nextEle2.tagName === 'UL') || (nextEle2 && nextEle2.classList.contains('mega-content'))) {

                        var currentHeight2 = nextEle2.clientHeight;
                        nextEle2.style.height = currentHeight2 + 'px';
                        nextEle2.addEventListener('transitionend', function() {
                            nextEle2.style.height = '0'; // Đặt lại height thành auto sau khi mở rộng hoàn tất
                        }, { once: true });
                    }
                });
            }
        } else {
            this.closest('li').classList.add('current');
            this.classList.add('current');
            var nextEle = this.nextElementSibling;
            nextEle.style.height = nextEle.scrollHeight + 'px';
            nextEle.addEventListener('transitionend', function() {
                nextEle.style.height = '100%';
            }, { once: true });

        }
    });
//    mobile

});
// //click vào button search mobile
// const searchMobileButton = document.querySelector('.header-action-item.search-mobile');
//
// searchMobileButton.addEventListener('click', function(e) {
//     e.preventDefault();
//     const searchMobileForm = document.querySelector('.search-mobile.search_form');
//     searchMobileForm.classList.toggle('open');
// });
//
// document.querySelectorAll('.header_tim_kiem .search-bar input.input-group-field, .search-mobile .search-bar input.input-group-field').forEach(function(input) {
//     input.addEventListener('focus', function(eventClick) {
//         eventClick.stopPropagation();
//         // Thêm class 'open' cho phần tử '.search-suggest'
//         var elements = document.querySelectorAll('.search-suggest');
//         elements.forEach((element, index) => {
//             element.classList.add("open");
//         });
//     });
// });

document.addEventListener('click', function(eventClick) {
    var isClickedInsideSearchBar = eventClick.target.closest('.header_tim_kiem .search-bar, .search-mobile .search-bar');

    if (!isClickedInsideSearchBar) {
        var elements = document.querySelectorAll('.search-suggest');
        elements.forEach((element, index) => {
            element.classList.remove("open");
        });
    }
});

// sroll fixed div
document.addEventListener('scroll', function() {
    var parent2 = document.querySelector('.header-mid');
    var parent = document.querySelector('.header-content');
    var offsetTop2 = parent2.offsetTop;
    var offsetTop = parent.offsetTop;
    var scrollTop = window.scrollY || window.scrollTop;

    if (scrollTop >= offsetTop) {
        parent.classList.add('fixed');
    } else {
        parent.classList.remove('fixed');
    }
    if (scrollTop >= offsetTop2) {
        parent2.classList.add('fixed');
    } else {
        parent2.classList.remove('fixed');
    }

});
