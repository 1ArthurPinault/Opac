const ratio = .1
const options = {
    root: null,
    rootMargin: '0px',
    threshold: ratio
}

const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
    if(entry.intersectionRatio > ratio) {
        entry.target.classList.add('reveal-visible')
        observer.unobserve(entry.target)
    }
    })
}

document.documentElement.classList.add('reveal-loaded')
const observer = new IntersectionObserver(handleIntersect, options);
document.querySelectorAll('[class*="reveal-"]').forEach(function (r) {
    observer.observe(r) 
})

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const galleryTrack = document.querySelector(".gallery-track");
const galleryPages = document.querySelectorAll(".gallery-page");

const nextBtn = document.getElementById("next-btn");

const prevBtn = document.getElementById("prev-btn");

let currentPage = 0;

function updateSlider(){

    galleryTrack.style.transform =
        `translateX(-${currentPage * 100}%)`;

}

nextBtn.addEventListener("click",()=>{

    currentPage++;

    if(currentPage >= galleryPages.length){

        currentPage = 0;

    }

    updateSlider();

});

prevBtn.addEventListener("click",()=>{

    currentPage--;

    if(currentPage < 0){

        currentPage = galleryPages.length-1;

    }

    updateSlider();

});
// Count-up animation for the stats teaser section

function animateCount(el, target, suffix, duration){

    const start = performance.now();

    function step(now){

        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(progress * target);

        el.textContent = current + suffix;

        if(progress < 1){
            requestAnimationFrame(step);
        } else {
            el.textContent = target + suffix;
        }

    }

    requestAnimationFrame(step);

}

const landingStatNumbers = document.querySelectorAll(".landing-stat-number");
let landingStatsAnimated = false;

function triggerLandingStatsAnimation(){

    if(landingStatsAnimated) return;
    landingStatsAnimated = true;

    landingStatNumbers.forEach(el => {

        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";

        animateCount(el, target, suffix, 1200);

    });

}

const statsTeaserSection = document.querySelector(".stats-teaser");

if(statsTeaserSection){

    const landingStatsObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if(entry.isIntersecting){
                triggerLandingStatsAnimation();
            }
        });

    }, { threshold: 0.3 });

    landingStatsObserver.observe(statsTeaserSection);

}
