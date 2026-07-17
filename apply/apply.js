const params = new URLSearchParams(window.location.search);

const job = params.get("job");

const jobTitle = document.getElementById("job-title");



if(job && jobTitle){

    jobTitle.innerHTML = decodeURIComponent(job);

}

else if(jobTitle){

    jobTitle.innerHTML = "YOUR Dream Job";

}




const cvInput = document.getElementById("cv");


const uploadLabel = document.querySelector(".upload-box label");


if(cvInput){


    cvInput.addEventListener("change",()=>{


        if(cvInput.files.length > 0){


            uploadLabel.innerHTML = `

                <span>✓</span>

                ${cvInput.files[0].name}

                <small>
                    File uploaded successfully
                </small>

            `;


        }


    });


}


const form = document.getElementById("application-form");

const successMessage = document.getElementById("success-message");



if(form){


    form.addEventListener("submit",(event)=>{


        event.preventDefault();



        successMessage.textContent =

        "Your application has been successfully submitted to Opac 🚀";



        form.reset();



        setTimeout(()=>{


            successMessage.textContent = "";


        },5000);



    });


}


const card = document.querySelector(".apply-card");


window.addEventListener("load",()=>{


    if(card){


        card.style.opacity = "0";

        card.style.transform = "translateY(40px)";



        setTimeout(()=>{


            card.style.transition = "all .8s ease";


            card.style.opacity="1";


            card.style.transform="translateY(0)";



        },200);


    }


});