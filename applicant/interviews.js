document.querySelectorAll(".accordion-question").forEach(question => {

    question.addEventListener("click", () => {

        const item = question.parentElement;
        const wasOpen = item.classList.contains("open");

        document.querySelectorAll(".accordion-item").forEach(el => el.classList.remove("open"));

        if(!wasOpen){
            item.classList.add("open");
        }

    });

});

const revealTargets = document.querySelectorAll(".step-card, .stat-card, .legal-card, .testimonial-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, { threshold: 0.15 });

revealTargets.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";

    observer.observe(el);

});
