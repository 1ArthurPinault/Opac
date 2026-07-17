const jobs = [

    { title:"Software Engineer", company:"TechNova Systems", category:"Technology", location:"Paris, France", mode:"Hybrid", type:"Full-time", salaryMin:48000, salaryMax:62000, posted:3, img:"../image/applicant/Software_Engineer.jpg", desc:"Build and maintain scalable web applications used by millions of users across Europe." },
    { title:"Marketing Manager", company:"Lumiere Consumer Goods", category:"Marketing", location:"Lyon, France", mode:"On-site", type:"Full-time", salaryMin:42000, salaryMax:55000, posted:5, img:"../image/applicant/Marketing_Manager.jpg", desc:"Lead go-to-market campaigns and manage a team of 4 brand specialists." },
    { title:"Financial Analyst", company:"Meridian Capital Partners", category:"Finance", location:"Paris, France", mode:"Hybrid", type:"Full-time", salaryMin:45000, salaryMax:58000, posted:7, img:"../image/applicant/Financial_Analyst.jpg", desc:"Build financial models and valuation reports to support investment decisions." },
    { title:"Project Manager", company:"Atlas Infrastructure Group", category:"Business", location:"Marseille, France", mode:"On-site", type:"Full-time", salaryMin:50000, salaryMax:65000, posted:2, img:"../image/applicant/Project_Manager.jpg", desc:"Coordinate cross-functional teams to deliver large-scale infrastructure projects on time." },
    { title:"Investment Banker", company:"Meridian Capital Partners", category:"Finance", location:"London, United Kingdom", mode:"On-site", type:"Full-time", salaryMin:70000, salaryMax:95000, posted:4, img:"../image/applicant/Investment_Banker.jpg", desc:"Advise corporate clients on mergers, acquisitions and capital raising operations." },
    { title:"Corporate Lawyer", company:"Fontaine & Associes", category:"Legal", location:"Paris, France", mode:"On-site", type:"Full-time", salaryMin:55000, salaryMax:75000, posted:6, img:"../image/applicant/Corporate_lawyer.jpg", desc:"Draft and negotiate commercial contracts while ensuring full regulatory compliance." },
    { title:"Strategy Consultant", company:"Northbridge Strategy Group", category:"Business", location:"Paris, France", mode:"Hybrid", type:"Full-time", salaryMin:52000, salaryMax:68000, posted:1, img:"../image/applicant/Strategy_Consultant.jpg", desc:"Advise executive teams on market entry, growth and operational efficiency strategies." },
    { title:"Product Manager", company:"TechNova Systems", category:"Technology", location:"Remote, EU", mode:"Remote", type:"Full-time", salaryMin:55000, salaryMax:70000, posted:3, img:"../image/applicant/Product_Manager.jpg", desc:"Own the roadmap of a B2B SaaS product from discovery to launch." },
    { title:"Marketing Director", company:"Lumiere Consumer Goods", category:"Marketing", location:"Lyon, France", mode:"On-site", type:"Full-time", salaryMin:65000, salaryMax:85000, posted:7, img:"../image/applicant/Marketing_Director.jpg", desc:"Define brand strategy across 12 markets and manage the full marketing P&L." },
    { title:"Cloud Architect", company:"Orbital Cloud Solutions", category:"Technology", location:"Toulouse, France", mode:"Remote", type:"Full-time", salaryMin:58000, salaryMax:75000, posted:2, img:"../image/applicant/Cloud_Architect.jpg", desc:"Design secure, highly available cloud infrastructures for enterprise clients." },
    { title:"Machine Learning Engineer", company:"Orbital Cloud Solutions", category:"Technology", location:"Remote, EU", mode:"Remote", type:"Full-time", salaryMin:55000, salaryMax:72000, posted:5, img:"../image/applicant/Machine_Learning_Engineer.jpg", desc:"Design, train and deploy ML models powering recommendation systems at scale." },
    { title:"UX/UI Designer", company:"Studio Kaleido", category:"Design", location:"Bordeaux, France", mode:"Hybrid", type:"Full-time", salaryMin:40000, salaryMax:52000, posted:3, img:"../image/applicant/UX-UI_Designer.jpg", desc:"Design intuitive, accessible interfaces for web and mobile products." },
    { title:"Business Manager", company:"Atlas Infrastructure Group", category:"Business", location:"Nantes, France", mode:"On-site", type:"Full-time", salaryMin:48000, salaryMax:60000, posted:6, img:"../image/applicant/Business_Manager.jpg", desc:"Identify new partnerships and manage key client accounts." },
    { title:"Research Scientist", company:"BioCentra Labs", category:"Science", location:"Grenoble, France", mode:"On-site", type:"Full-time", salaryMin:46000, salaryMax:60000, posted:7, img:"../image/applicant/Research_Scientist.jpg", desc:"Conduct applied research to develop new materials for industrial clients." },
    { title:"Solutions Architect", company:"Orbital Cloud Solutions", category:"Technology", location:"Paris, France", mode:"Hybrid", type:"Full-time", salaryMin:60000, salaryMax:78000, posted:4, img:"../image/applicant/Solutions_Architect.jpg", desc:"Translate complex business needs into robust, scalable technical solutions." },
    { title:"Quantitative Analyst", company:"Meridian Capital Partners", category:"Finance", location:"Paris, France", mode:"On-site", type:"Full-time", salaryMin:65000, salaryMax:90000, posted:2, img:"../image/applicant/Quantitative_Analyst.jpg", desc:"Build mathematical models to support trading and risk management decisions." }

];

const grid = document.getElementById("job-grid");
const searchInput = document.getElementById("job-search");
const sortSelect = document.getElementById("sort-select");
const pills = document.querySelectorAll(".pill");
const resultsCount = document.getElementById("results-count");

let activeCategory = "All";

function formatSalary(min, max){
    return "\u20ac" + min.toLocaleString("en-US") + " \u2013 \u20ac" + max.toLocaleString("en-US");
}

function renderJobs(){

    const query = searchInput.value.trim().toLowerCase();
    const sortValue = sortSelect.value;

    let filtered = jobs.filter(job => {
        const matchesCategory = activeCategory === "All" || job.category === activeCategory;
        const matchesQuery = job.title.toLowerCase().includes(query)
            || job.company.toLowerCase().includes(query)
            || job.location.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
    });

    if(sortValue === "recent"){
        filtered.sort((a,b) => a.posted - b.posted);
    } else if(sortValue === "salary-high"){
        filtered.sort((a,b) => b.salaryMax - a.salaryMax);
    } else if(sortValue === "salary-low"){
        filtered.sort((a,b) => a.salaryMin - b.salaryMin);
    }

    grid.innerHTML = "";

    resultsCount.innerHTML = "<strong>" + filtered.length + "</strong> position" + (filtered.length !== 1 ? "s" : "") + " found";

    if(filtered.length === 0){
        grid.innerHTML = "<p class='no-results'>No position matches your search. Try another keyword or category.</p>";
        return;
    }

    filtered.forEach((job, index) => {

        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <div class="thumb">
                <img src="${job.img}" alt="${job.title}">
            </div>
            <div class="content">
                <div class="top-line">
                    <span class="category-tag">${job.category}</span>
                    <span class="posted">${job.posted}d ago</span>
                </div>
                <h3>${job.title}</h3>
                <p class="company">${job.company} &middot; ${job.location}</p>
                <div class="meta">
                    <span>${job.mode}</span>
                    <span>${job.type}</span>
                </div>
                <p class="salary">${formatSalary(job.salaryMin, job.salaryMax)} / year</p>
                <a class="apply-link" href="../apply/apply.html?job=${encodeURIComponent(job.title)}">Apply anonymously</a>
            </div>
        `;

        grid.appendChild(card);

        setTimeout(() => {
            card.classList.add("show");
        }, index * 60);

    });

}

document.querySelectorAll(".pill").forEach(pill => {

    pill.addEventListener("click", () => {

        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        activeCategory = pill.dataset.category;

        renderJobs();

    });

});

searchInput.addEventListener("input", renderJobs);
sortSelect.addEventListener("change", renderJobs);

renderJobs();
