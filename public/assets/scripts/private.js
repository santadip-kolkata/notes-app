const cards = [
    { 
        title: "Angular Notes", 
        category: "Framework / Front End", 
        icon: "fa-brands fa-angular",
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf' 
    },
    { 
        title: "Spring Notes", 
        category: "Framework / Backend", 
        image:'assets/images/note_icons/spring.png' ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "Spring Boot", 
        category: "Framework / Backend", 
        image:'assets/images/note_icons/spring_boot.png' ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "MySQL Notes", 
        category: "DBMS / SQL", 
        image:'assets/images/note_icons/mysql.png' ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "Oracle SQL Notes", 
        category: "DBMS/ SQL", 
        image:'assets/images/note_icons/oracle.png' ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "DBMS Notes", 
        category: "Database Management System / Theory", 
        icon: "fa-solid fa-database" ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "Mongodb Notes", 
        category: "DBMS / NOSQL", 
        image:"assets/images/note_icons/mongodb.png",
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },  
    { 
        title: "Linux Notes", 
        category: "Operating System / DevOps", 
        icon: "fa-brands fa-linux" ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "Docker", 
        category: "Containerization Tool / DevOps", 
        icon:'fa-brands fa-docker',
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "Git", 
        category: "Version Control / Devops", 
        icon:'fa-brands fa-git-alt',
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    }

];

// Get the container div
const container = document.getElementById("cardContainer");

// Loop through the array and generate cards
cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML =cardElement.innerHTML = `
    <div class="icon">
        ${card.icon ? `<i class="${card.icon}"></i>` : `<img src="${card.image}" alt="icon">`}
    </div>
    <h3>${card.title}</h3>
    <p>Category: ${card.category}</p>
    <button class="view-btn button-6" data-index="${index}">View</button>
`;


    container.appendChild(cardElement);
});

document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        if(index>=0)
        {
            const loadingTask = pdfjsLib.getDocument(cards[index].fileUrl);
            loadingTask.promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const canvas = document.getElementById("pdfCanvas");
                    const context = canvas.getContext("2d");

                    const viewport = page.getViewport({ scale: 1.5 });
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    page.render(renderContext);
                });
            });

            // Show the modal
            document.getElementById("pdfModal").style.display = "flex";
        }
        else{
            alert("invalid index");
        }
        
    });
});

function closePDF() {
    document.getElementById("pdfModal").style.display = "none";
    document.getElementById("pdfCanvas").getContext("2d").clearRect(0, 0, pdfCanvas.width, pdfCanvas.height);
}



// console.log(`Title: ${cards[index].title}, Category: ${cards[index].category}`);
// Set PDF source to iframe