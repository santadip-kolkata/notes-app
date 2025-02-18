const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const validateUser = require('../middlewares/validateUser');
const authenticateToken = require("../middlewares/authenticateToken")

// Endpoint to generate PDF with watermark for private access
router.get('/private/generate-pdf',  authenticateToken,validateUser,pdfController.generatePrivatePdf);

// Endpoint to access public PDFs
router.get('/public/generate-pdf/:file', pdfController.generatePublicPdf);

module.exports = router;
