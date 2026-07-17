const stages = ["Written Screening", "Voice Interview", "Final Panel", "Hired"];

let candidates = [
    { id:"Candidate #A47F2", role:"Software Engineer", stage:0 },
    { id:"Candidate #B12C9", role:"Software Engineer", stage:1 },
    { id:"Candidate #C88D1", role:"Software Engineer", stage:2 },
    { id:"Candidate #D45E7", role:"Marketing Manager", stage:0 },
    { id:"Candidate #E90F3", role:"Marketing Manager", stage:1 },
    { id:"Candidate #F33A8", role:"Financial Analyst", stage:0 },
    { id:"Candidate #G61B4", role:"Financial Analyst", stage:3 },
    { id:"Candidate #H27C6", role:"Project Manager", stage:1 },
    { id:"Candidate #I84D2", role:"Project Manager", stage:2 },
    { id:"Candidate #J39E9", role:"UX/UI Designer", stage:0 },
    { id:"Candidate #K72F5", role:"UX/UI Designer", stage:2 },
    { id:"Candidate #L05A1", role:"Cloud Architect", stage:1 }
];

const postings = [
    { title:"Software Engineer", status:"Open" },
    { title:"Marketing Manager", status:"Open" },
    { title:"Financial Analyst", status:"Open" },
    { title:"Project Manager", status:"Open" },
    { title:"UX/UI Designer", status:"Paused" },
    { title:"Cloud Architect", status:"Open" }
];

let activity = [
    { text:"Candidate #G61B4 was hired for Financial Analyst.", time:"2 days ago" },
    { text:"Candidate #C88D1 advanced to Final Panel.", time:"3 days ago" },
    { text:"New posting \"Cloud Architect\" was published.", time:"5 days ago" }
];

const statActivePostings = document.getElementById("stat-active-postings");
const statPipeline = document.getElementById("stat-pipeline");
const statHired = document.getElementById("stat-hired");
const postingsBody = document.getElementById("postings-body");
const kanban = document.getElementById("kanban");
const activityFeed = document.getElementById("activity-feed");

function renderStats(){

    const activeCount = postings.filter(p => p.status === "Open").length;
    const pipelineCount = candidates.filter(c => c.stage < 3).length;
    const hiredCount = candidates.filter(c => c.stage === 3).length;

    statActivePostings.textContent = activeCount;
    statPipeline.textContent = pipelineCount;
    statHired.textContent = hiredCount;

}

function renderPostings(){

    postingsBody.innerHTML = "";

    postings.forEach(posting => {

        const applicantCount = candidates.filter(c => c.role === posting.title).length;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${posting.title}</td>
            <td>${applicantCount}</td>
            <td><span class="status-pill ${posting.status.toLowerCase()}">${posting.status}</span></td>
        `;

        postingsBody.appendChild(row);

    });

}

function renderKanban(){

    kanban.innerHTML = "";

    stages.forEach((stageName, stageIndex) => {

        const column = document.createElement("div");
        column.className = "kanban-column";

        const stageCandidates = candidates.filter(c => c.stage === stageIndex);

        let cardsHtml = "";

        if(stageCandidates.length === 0){
            cardsHtml = "<p class='empty-column'>No candidate here</p>";
        } else {

            stageCandidates.forEach(candidate => {

                const isHired = stageIndex === 3;

                cardsHtml += `
                    <div class="candidate-card" data-id="${candidate.id}">
                        <p class="cand-id">${candidate.id}</p>
                        <p class="cand-role">${candidate.role}</p>
                        ${isHired
                            ? '<span class="hired-tag">Hired</span>'
                            : `<div class="cand-actions">
                                <button class="advance" data-action="advance" data-id="${candidate.id}">Advance</button>
                                <button class="reject" data-action="reject" data-id="${candidate.id}">Reject</button>
                               </div>`
                        }
                    </div>
                `;

            });

        }

        column.innerHTML = `
            <h3>${stageName} <span class="count">${stageCandidates.length}</span></h3>
            ${cardsHtml}
        `;

        kanban.appendChild(column);

    });

    kanban.querySelectorAll("button[data-action]").forEach(btn => {

        btn.addEventListener("click", () => {

            const id = btn.dataset.id;
            const action = btn.dataset.action;
            const candidate = candidates.find(c => c.id === id);

            if(!candidate) return;

            if(action === "advance"){

                const nextStage = candidate.stage + 1;
                candidate.stage = nextStage;
                activity.unshift({ text: id + " advanced to " + stages[nextStage] + ".", time: "just now" });

            } else if(action === "reject"){

                candidates = candidates.filter(c => c.id !== id);
                activity.unshift({ text: id + " was rejected from the process.", time: "just now" });

            }

            renderStats();
            renderPostings();
            renderKanban();
            renderActivity();

        });

    });

}

function renderActivity(){

    activityFeed.innerHTML = "";

    activity.slice(0, 8).forEach(item => {

        const el = document.createElement("div");
        el.className = "activity-item";
        el.innerHTML = `
            <span class="activity-dot"></span>
            <div>
                <span>${item.text}</span>
                <span class="activity-time">${item.time}</span>
            </div>
        `;

        activityFeed.appendChild(el);

    });

}

renderStats();
renderPostings();
renderKanban();
renderActivity();
