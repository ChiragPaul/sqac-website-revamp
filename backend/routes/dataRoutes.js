const express = require('express');
const router = express.Router();
const { getData, getField, uploadImage } = require('../controllers/dataController');
const { storage } = require('../utils/cloudinary');
const multer = require('multer');

const upload = multer({ storage });

router.get('/data', getData);
router.get('/data/field/:fieldName', getField);
router.post('/upload/:id', upload.single('image'), uploadImage);

module.exports = router;
