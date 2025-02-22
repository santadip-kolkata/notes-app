const cards = [
    {
        title: "C Notes",
        category: "Programming Language",
        icon: "fa-solid fa-c",
        fileUrl: 'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    {
        title: "Java Notes",
        category: "Programming Language",
        icon: "fa-brands fa-java",
        fileUrl: 'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    {
        title: "Golang Notes",
        category: "Programming Language",
        icon: "fa-brands fa-golang",
        fileUrl: 'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    {
        title: "Python",
        category: "Programming Language",
        icon: "fa-brands fa-python",
        fileUrl: 'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    {
        title: "Javascript",
        category: "Programming Language",
        icon: "fa-brands fa-js",
        fileUrl: 'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    {
        title: "DSA",
        category: "Theory",
        image: 'assets/images/note_icons/dsa.png',
        fileUrl: 'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    {
        title: "Arduino",
        category: "MicroController",
        image: 'assets/images/note_icons/arduino.svg',
        fileUrl: 'http://localhost:3000/public/generate-pdf/sample.pdf'
    },
    {
        title: "NASM",
        category: "32 Bit Assembly",
        image: 'assets/images/note_icons/nasm.svg',
        fileUrl: 'http://localhost:3000/public/generate-pdf/sample.pdf'
    }
];

// Get the container div
const container = document.getElementById("cardContainer");

// Loop through the array and generate cards
cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
    <div class="relative mx-auto bg-white w-[220px] h-[200px] p-6 rounded-lg shadow-md border-l-4 border-green-400 font-mono 
                bg-[linear-gradient(white_50%,#f5f5f5_50%)] bg-[length:100%_30px] bg-repeat">
        <div class="absolute top-4 right-4 text-green-400 text-xl">
            ${card.icon ? `<i class="${card.icon}"></i>` : `<img src="${card.image}" alt="icon" class="w-6 h-6">`}
        </div>
        <h3 class="text-lg font-bold mb-2">${card.title}</h3>
        <p class="text-sm text-gray-600 mb-4 h-[40px]">Category: ${card.category}</p>
        <button class="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition 
                       card-file view-btn" data-index="${index}">
            View
        </button>
    </div>
`;
    container.appendChild(cardElement);
});

document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        if (index >= 0) {
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
        else {
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