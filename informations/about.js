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

const statBlocks = document.querySelectorAll(".stat-block .stat-number");
let statsAnimated = false;

function triggerStatsAnimation(){

    if(statsAnimated) return;
    statsAnimated = true;

    statBlocks.forEach(el => {

        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";

        animateCount(el, target, suffix, 1200);

    });

}

const statsSection = document.getElementById("stats-strip");

const statsObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if(entry.isIntersecting){
            triggerStatsAnimation();
        }
    });

}, { threshold: 0.3 });

if(statsSection){
    statsObserver.observe(statsSection);
}

// Generic reveal-on-scroll for the rest of the page

const revealTargets = document.querySelectorAll(".value-card, .team-card, .timeline-item");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });

}, { threshold: 0.15 });

revealTargets.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";

    revealObserver.observe(el);

});
