/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


// Define Global Variables
let header = document.querySelector(".page__header");
let navList = document.querySelector("nav > ul");
let navElements = [];
let sections = document.querySelectorAll("section");
let fragment = document.createDocumentFragment();
let scrollToTopBtn = document.querySelector(".scrollToTop");
let headerTimerDisplay;
// End Global Variables

// Start Helper Functions

function removeAllActive() {
    navElements.forEach(el => el.classList.contains("active") ? el.classList.remove("active") : false);
    sections.forEach(el => el.classList.contains("active") ? el.classList.remove("active") : false);
}

function hideWithoutScroll() {
    headerTimerDisplay = setTimeout(() => {
        header.style.display = "none";
    }, 5000)
}

function scrollToTopDisplay() {
    if(pageYOffset > 0)  scrollToTopBtn.style.opacity = "1";
    else scrollToTopBtn.style.opacity = "0";
}

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({"left": 0, "top": 0, "behavior": "smooth"});
})

// Main functions

// building the nav menu
function buildNav() {
    sections.forEach((el, i) => {
        let navElement = document.createElement("li"); 
        navElement.textContent = el.getAttribute("data-nav");
        navElement.dataset.nav = el.getAttribute("data-nav");
        i === 0 ? navElement.classList.add("active") : false;
        navElements[i] = navElement;
        fragment.appendChild(navElement);
    })
    navList.appendChild(fragment);
}

// Scroll to section by clicking it on the nav
navList.addEventListener("click", e => {
        let clickedNavEl = e.target;
        let currentSec = document.querySelector(`main > section[data-nav="${clickedNavEl.textContent}"]`);
        currentSec.scrollIntoView({"behavior": "smooth"});
})

/* 
Listening to scroll, 
1- getting the current viewed section 
2- getting the nav tab
3- setting active classes on the viewed section and the nav tab
4- showing scroll to top while scrolling
5- show the header while scrolling and hide the header when there is no scroll 
*/ 
document.addEventListener("scroll", () => {
    for(let i=0; i<sections.length; i++){
        let secInfo =  sections[i].getBoundingClientRect();
        if(secInfo.y <= secInfo.height/2 && secInfo.y > -1*secInfo.height/2) {
            let currentNavEl = document.querySelector(`nav > ul > li[data-nav="${sections[i].dataset.nav}"]`); 
            removeAllActive();
            currentNavEl.classList.add("active");
            sections[i].classList.add("active");
            break;
        }
    }
    scrollToTopDisplay();
    clearTimeout(headerTimerDisplay);
    header.style.display = "block";
    hideWithoutScroll();
})

buildNav();