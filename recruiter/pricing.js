const toggleTrack = document.getElementById("billing-toggle-track");
const labelMonthly = document.getElementById("label-monthly");
const labelAnnual = document.getElementById("label-annual");
const priceElements = document.querySelectorAll("[data-monthly]");
const billedNotes = document.querySelectorAll(".plan-billed-note");

let isAnnual = false;

function renderPrices(){

    priceElements.forEach(el => {

        const monthly = parseFloat(el.dataset.monthly);
        const amountEl = el.querySelector(".amount");
        const noteEl = el.closest(".plan-price").nextElementSibling;

        if(isAnnual){

            const annualEquivalent = Math.round(monthly * 0.8);
            amountEl.textContent = "\u20ac" + annualEquivalent;

            if(noteEl && noteEl.classList.contains("plan-billed-note")){
                noteEl.textContent = "billed annually, save 20%";
            }

        } else {

            amountEl.textContent = "\u20ac" + monthly;

            if(noteEl && noteEl.classList.contains("plan-billed-note")){
                noteEl.textContent = "billed monthly";
            }

        }

    });

}

toggleTrack.addEventListener("click", () => {

    isAnnual = !isAnnual;

    toggleTrack.classList.toggle("annual", isAnnual);
    labelMonthly.classList.toggle("active", !isAnnual);
    labelAnnual.classList.toggle("active", isAnnual);

    renderPrices();

});

labelMonthly.addEventListener("click", () => {
    if(isAnnual){ toggleTrack.click(); }
});

labelAnnual.addEventListener("click", () => {
    if(!isAnnual){ toggleTrack.click(); }
});

renderPrices();

// FAQ accordion

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
