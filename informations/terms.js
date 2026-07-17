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
