const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

// Function to generate the PDF with watermark for private access
const generatePrivatePdf = async (req, res) => {
    const username = req.username; // Username from validation middleware

    try {
        // Load the original PDF from the private folder
        const pdfPath = path.join(__dirname, '..', 'private','sample.pdf');
        const existingPdfBytes = fs.readFileSync(pdfPath);

        // Load a PDFDocument
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Embed a font for the watermark (corrected)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica); // Corrected here

        // Get the total number of pages
        const pages = pdfDoc.getPages();

        // Add watermark to each page
        pages.forEach((page) => {
            const { width, height } = page.getSize();
            page.drawText(username+" GeeksforGeeks Student Chapter UEM, Kolkata", {
                x: width / 2 - 50,
                y: height / 2,
                size: 50,
                font: helveticaFont,
                color: rgb(0.75, 0.75, 0.75),
                opacity: 0.5,
                rotate: { type: 'degrees', angle: 45 },
            });
        });

        // Serialize the PDF to bytes
        const pdfBytes = await pdfDoc.save();

        // Set headers to prevent download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
        res.send(Buffer.from(pdfBytes));
        

        // Send the PDF to the browser
        // res.send(pdfBytes);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
};

// Function to access public PDFs
const generatePublicPdf = async (req, res) => {
    try {
        const filename = req.params.file;
        if(!filename)
        {
            res.status(400).send('Please provide a filename');
        }
        // Load the original PDF from the public folder
        const pdfPath = path.join(__dirname, '..', 'public', 'assets','pdfs',filename);
        const pdfBytes = fs.readFileSync(pdfPath);

        // Set headers to prevent download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');

        // Send the PDF to the browser
        res.send(pdfBytes);
    } catch (error) {
        console.error('Error accessing public PDF:', error);
        res.status(500).send('Error accessing public PDF');
    }
};

module.exports = {
    generatePrivatePdf,
    generatePublicPdf
};
