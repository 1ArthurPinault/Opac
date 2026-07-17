// Checklist with progress bar

const checkboxes = document.querySelectorAll(".checklist-item input[type='checkbox']");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");

function updateProgress(){

    const total = checkboxes.length;
    const checked = document.querySelectorAll(".checklist-item input[type='checkbox']:checked").length;
    const percent = total === 0 ? 0 : Math.round((checked / total) * 100);

    progressFill.style.width = percent + "%";
    progressLabel.textContent = checked + " of " + total + " steps completed (" + percent + "%)";

}

checkboxes.forEach(box => {

    box.addEventListener("change", () => {

        box.closest(".checklist-item").classList.toggle("checked", box.checked);
        updateProgress();

    });

});

updateProgress();

// Glossary accordion

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
