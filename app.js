const menu = document.querySelector('#mobile-menu', '#mobile-menu2');
const menuLinks = document.querySelector('.navbar__menu' );

menu.addEventListener('click', function(){
 menu.classList.toggle('is-active');
 menuLinks.classList.toggle('active');
});




const images = [
    '/images/pic6.jpg', 
    '/images/pic7.jpg',
    '/images/pic8.jpg',
    '/images/pic9.jpg' 
];

let currentIndex = 0; 


function changeBackgroundImage() {
    const serviceCard = document.getElementById('serviceCard');
    

    serviceCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(17,17 , 17, 0.6) 100%), url('${images[currentIndex]}')`;

    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackgroundImage, 5000);







    