const companies = [

    { name:"Microsoft", sector:"Technology", featured:true },
    { name:"Capgemini", sector:"Technology", featured:false },
    { name:"Orange", sector:"Technology", featured:false },
    { name:"TechNova Systems", sector:"Technology", featured:false },
    { name:"Orbital Cloud Solutions", sector:"Technology", featured:false },

    { name:"BNP Paribas", sector:"Finance", featured:false },
    { name:"Societe Generale", sector:"Finance", featured:false },
    { name:"AXA", sector:"Finance", featured:false },
    { name:"Meridian Capital Partners", sector:"Finance", featured:false },

    { name:"LVMH", sector:"Luxury & Retail", featured:true },
    { name:"L'Oreal", sector:"Luxury & Retail", featured:false },
    { name:"Lumiere Consumer Goods", sector:"Luxury & Retail", featured:false },

    { name:"BMW", sector:"Industry & Energy", featured:true },
    { name:"Renault", sector:"Industry & Energy", featured:false },
    { name:"TotalEnergies", sector:"Industry & Energy", featured:false },
    { name:"Atlas Infrastructure Group", sector:"Industry & Energy", featured:false },

    { name:"Deloitte", sector:"Consulting", featured:false },
    { name:"Northbridge Strategy Group", sector:"Consulting", featured:false },

    { name:"Sanofi", sector:"Healthcare & Science", featured:false },
    { name:"BioCentra Labs", sector:"Healthcare & Science", featured:false },

    { name:"Gide Loyrette Nouel", sector:"Legal", featured:false },
    { name:"Fontaine & Associes", sector:"Legal", featured:false }

];

const grid = document.getElementById("network-grid");
const resultsCount = document.getElementById("results-count");
const pills = document.querySelectorAll(".pill");

let activeCategory = "All";

function renderCompanies(){

    const filtered = companies.filter(c => activeCategory === "All" || c.sector === activeCategory);

    grid.innerHTML = "";

    resultsCount.innerHTML = "<strong>" + filtered.length + "</strong> compan" + (filtered.length !== 1 ? "ies" : "y") + " in this view";

    if(filtered.length === 0){
        grid.innerHTML = "<p class='no-results'>No company in this category yet.</p>";
        return;
    }

    filtered.forEach((company, index) => {

        const card = document.createElement("div");
        card.className = "network-card";

        card.innerHTML = `
            <div class="top-line">
                <h4>${company.name}</h4>
                ${company.featured ? '<span class="featured-badge"><i class="fa-solid fa-star"></i> Featured</span>' : ""}
            </div>
            <span class="sector">${company.sector}</span>
        `;

        grid.appendChild(card);

        setTimeout(() => {
            card.classList.add("show");
        }, index * 40);

    });

}

pills.forEach(pill => {

    pill.addEventListener("click", () => {

        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        activeCategory = pill.dataset.category;

        renderCompanies();

    });

});

renderCompanies();
