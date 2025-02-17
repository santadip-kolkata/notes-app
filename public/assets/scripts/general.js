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
            document.getElementById("pdfViewer").src = cards[index].fileUrl;
        }
        else{
            alert("invalid index");
        }
        document.getElementById("pdfModal").style.display = "flex";
    });
});

function closePDF() {
    document.getElementById("pdfModal").style.display = "none";
    document.getElementById("pdfViewer").src = ""; // Clear PDF source
}



// console.log(`Title: ${cards[index].title}, Category: ${cards[index].category}`);
// Set PDF source to iframe