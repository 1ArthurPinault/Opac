const revealTargets = document.querySelectorAll(".value-card, .stat-block, .process-step, .trust-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, { threshold: 0.15 });

revealTargets.forEach(el => {

    el.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(el);

});
