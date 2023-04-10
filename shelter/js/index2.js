
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

function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const slideshow = document.querySelector('.slideshow-container')


const createPet = (aData) => {
    let div = document.createElement('div');
    div.className = 'image-slider';
    
    let img = document.createElement('img');
    img.className = 'img_slider';
    img.src = "assets/image/" + aData.img;
    img.alt = 'pert';
    
    let p = document.createElement('p');
    p.className = 'title-img-slider';
    p.textContent = aData.name;
    
    let a = document.createElement('a');
    a.className = 'button-slider';
    a.textContent = 'Learn more';
    
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(a);

    return div
}

const createPetBlock = (index, count) => {
    const sliderBlock = document.createElement('div')
    sliderBlock.className = 'mySlides'
    sliderBlock.classList.add('fade')
    sliderBlock.dataset.block = index

    // if (index !== 1) {
    //     sliderBlock.style.display = 'none'
    // }
    // else
    //     sliderBlock.style.display = 'block'

    const petsBlock = document.createElement('div')
    petsBlock.className = 'table'
    petsBlock.dataset.block = index

    const order = []
    while (order.length < count) {
        const num = getRandomIndex(0, count - 1)
        if (!order.includes(num)) {
            order.push(num)
        }
    }

    order.forEach(animal => {
        let pet = createPet(pets[animal]);
        pet.dataset.index = animal;
        petsBlock.appendChild(pet)
    })

    sliderBlock.appendChild(petsBlock)

    return sliderBlock
}

const clearPetList = () => {
    while (slideshow.childNodes.length !== 0) {
        slideshow.removeChild(slideshow.childNodes[0])
    }
}

const fillPetList = () => {
    clearPetList()
    slideshow.appendChild(createPetBlock(1, 8))
    slideshow.appendChild(createPetBlock(2, 8))
    slideshow.appendChild(createPetBlock(3, 8))
    slideshow.appendChild(createPetBlock(4, 8))
}

fillPetList();

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
    slideIndex = 1;
    }
    if (n < 1) {
    slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
}


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


