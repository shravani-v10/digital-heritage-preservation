/* =================================
   HERO IMAGE SLIDER
================================= */

const slides = document.querySelectorAll(".hero-slide");

const placeName = document.querySelector(".hero-place");

let currentSlide = 0;


/* =================================
   CHANGE SLIDE
================================= */

function showNextSlide() {

    // Current slide
    const current = slides[currentSlide];

    // Move to next slide
    currentSlide++;

    // Start again after the last image
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    // Next slide
    const next = slides[currentSlide];


    /* -------------------------------
       Move current image out
    -------------------------------- */

    current.style.transform = "translateX(-100%)";


    /* -------------------------------
       Bring next image in
    -------------------------------- */

    next.style.transform = "translateX(0)";


    /* -------------------------------
       Change place name
    -------------------------------- */

    placeName.textContent = next.dataset.place;


    /* -------------------------------
       Reset old slide
    -------------------------------- */

    setTimeout(() => {

        current.style.transform = "translateX(100%)";

    }, 1800);

}


/* =================================
   AUTOMATIC SLIDER
================================= */

/*
   Change image every 5 seconds.

   The actual movement takes
   1.8 seconds.
*/

setInterval(showNextSlide, 5000);