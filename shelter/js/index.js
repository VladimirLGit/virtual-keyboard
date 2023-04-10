const hamburger_line = document.querySelector("#hamburger_line");
const hamburger_line_close = document.querySelector("#hamburger_line_close");
const burgerShadow = document.querySelector('.burger_shadow');
const popup = document.querySelector("#popup_menu");
const body = document.body;

// Клонируем меню, чтобы задать свои стили для мобильной версии
const menu = document.querySelector("#menu").cloneNode(1);

// При клике на иконку hamburger_line вызываем ф-ию hambHandler
hamburger_line.addEventListener("click", hambHandler);

hamburger_line_close.addEventListener("click", closeOnClick);
burgerShadow.addEventListener('click', closeOnClick);

// Выполняем действия при клике ..
function hambHandler(e) {
    e.preventDefault();
    // Переключаем стили элементов при клике
    popup.classList.toggle("show_menu");    
    burgerShadow.classList.add('show_shadow');
    hamburger_line.classList.toggle("active")
    body.classList.toggle("noscroll");
    renderPopup();
}

// Закрытие попапа при клике на меню
function closeOnClick() {
    popup.classList.remove("show_menu");  
    burgerShadow.classList.remove("show_shadow")
    hamburger_line.classList.remove("active");
    body.classList.remove("noscroll");
}


// Здесь мы рендерим элементы в наш попап
function renderPopup() {
    popup.appendChild(menu);
}


// Код для закрытия меню при нажатии на ссылку
const links = Array.from(menu.children);

// Для каждого элемента меню при клике вызываем ф-ию
links.forEach((link) => {    
    link.addEventListener("click", closeOnClick);
});

const pets = [
    {
        img: 'pets-charly.png',
        name: 'charly'
    },
    {
        img: 'pets-freddie.png',
        name: 'freddie'
    },
    {
        img: 'pets-jennifer.png',
        name: 'jennifer'
    },
    {
        img: 'pets-katrine.png',
        name: 'katrine'
    },    
    {
        img: 'pets-scarlet.png',
        name: 'scarlet'
    },
    {
        img: 'pets-sophia.png',
        name: 'sophia'
    },
    {
        img: 'pets-timmy.png',
        name: 'timmy'
    },
    {
        img: 'pets-woody.png',
        name: 'woody'
    }
]

const images = document.querySelectorAll('.slider .slider-line img');
const sliderLine = document.querySelector('.slider .slider-line');

let count = 0;

var itemListParent = document.querySelector('.slider-line');
var itemList = document.querySelectorAll('.image-slider');

document.querySelector('.slider-next').addEventListener('click', function () {
    // сработает как appendChild (т.к. второй аргумент null) - поместит второй элемент в конец родительского.
    itemListParent.insertBefore(itemList[0], null);
    itemList = document.querySelectorAll('.image-slider');
});

document.querySelector('.slider-prev').addEventListener('click', function () {
    // сработает как того предполагает insertBefore() - вставит пятый элемент перед первым
    itemListParent.insertBefore(itemList[2], itemList[0]);
    itemList = document.querySelectorAll('.image-slider');
});

const shadow = document.querySelector('.burger_shadow')
const petPopup = document.querySelector('.pet-popup')

const openPetPopup = (event) => {
    let target = event.target
    while (!Array.from(target.classList).includes('image-slider')) {
        target = target.parentNode
    }
    let index = target.dataset.index
    petPopup.querySelector('.img_slider').src = 'assets/image/' + pets[index].img
    petPopup.querySelector('.title-img-slider').textContent = pets[index].name

    petPopup.classList.add('active-popup')
    shadow.classList.add('show_shadow')
    body.classList.add('lock-scroll')
}

document.querySelectorAll('.image-slider').forEach(element => {
    element.addEventListener('click', openPetPopup);
}); 

const closePetPopup = () => {
    petPopup.classList.remove('active-popup')
    shadow.classList.remove('show_shadow')
    body.classList.remove('lock-scroll')
}

shadow.addEventListener('click', (event) => {
    closeOnClick()
    closePetPopup()
})

document.querySelector('.btn-close').addEventListener('click', closePetPopup)