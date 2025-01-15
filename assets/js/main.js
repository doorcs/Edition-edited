var html = document.documentElement;
var body = document.body;
var timeout;
var st = 0;

checkCookie(); // Javascrip의 호이스팅(Hoisting)을 활용! ( 함수 선언문은 자동으로 상단에 끌어올려지므로, 함수 선언 이전에도 호출 가능 )
cover();
featured();
pagination(false);

document.addEventListener('DOMContentLoaded', function () { // 하이퍼링크를 현재 창 대신 새 창에서 열기
    var links = document.querySelectorAll('a');
    links.forEach(function (link) {
        if (link.hostname != window.location.hostname) {
            link.target = '_blank';
        }
    });
});

window.addEventListener('scroll', function () {
    'use strict';
    if (body.classList.contains('home-template') && body.classList.contains('with-full-cover') && !document.querySelector('.cover').classList.contains('half')) {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(portalButton);
    }
});

if (document.querySelector('.cover') && document.querySelector('.cover').classList.contains('half')) {
    body.classList.add('portal-visible');
}

function portalButton() {
    'use strict';
    st = window.scrollY;

    if (st > 300) {
        body.classList.add('portal-visible');
    } else {
        body.classList.remove('portal-visible');
    }
}

function cover() {
    'use strict';
    var cover = document.querySelector('.cover');
    if (!cover) return;

    imagesLoaded(cover, function () {
        cover.classList.remove('image-loading');
    });

    document.querySelector('.cover-arrow').addEventListener('click', function () {
        var element = cover.nextElementSibling;
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function featured() {
    'use strict';
    var feed = document.querySelector('.featured-feed');
    if (!feed) return;

    tns({
        container: feed,
        controlsText: [
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20.547 22.107L14.44 16l6.107-6.12L18.667 8l-8 8 8 8 1.88-1.893z"></path></svg>',
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M11.453 22.107L17.56 16l-6.107-6.12L13.333 8l8 8-8 8-1.88-1.893z"></path></svg>',
        ],
        gutter: 30,
        loop: false,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });
}

function checkCookie() { // 다크모드 적용 로직
    let ca = document.cookie.split(';');
    let preference = "none";

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf("darkmode-preferred=") === 0) {
            preference = c.substring("darkmode-preferred=".length, c.length);
            break;
        }
    }

    if (preference === "true") {
        body.classList.add("dark");
    } else if (preference === "false") {
        body.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
    }
}
