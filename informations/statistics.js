const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

function activateTab(target){

    tabButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === target);
    });

    tabPanels.forEach(panel => {
        panel.classList.toggle("active", panel.id === target);
    });

}

tabButtons.forEach(btn => {

    btn.addEventListener("click", () => {
        activateTab(btn.dataset.tab);
    });

});
