const cards = [
    { 
        title: "C Notes", 
        category: "Programming Language", 
        icon: "fa-solid fa-c" ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "Java Notes", 
        category: "Programming Language", 
        icon: "fa-brands fa-java",
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf' 
    },
    { 
        title: "Golang Notes", 
        category: "Programming Language", 
        icon: "fa-brands fa-golang" ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "Python", 
        category: "Programming Language", 
        icon: "fa-brands fa-python" ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    { 
        title: "Javascript", 
        category: "Programming Language", 
        icon: "fa-brands fa-js" ,
        fileUrl:'http://localhost:3000/public/generate-pdf/sample.pdf'
    }
];

// Get the container div
const container = document.getElementById("cardContainer");

// Loop through the array and generate cards
cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
        <div class="icon"><i class="${card.icon}"></i></div>
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