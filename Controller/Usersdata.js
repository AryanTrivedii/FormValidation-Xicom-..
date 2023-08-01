const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const FormData = require('../Models/UsersData');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/usersinfo', upload.single('file'), async (req, res) => {
  try {
    if (!fs.existsSync('./uploads')) {
      console.log('Creating "uploads" directory...');
      fs.mkdirSync('./uploads');
      console.log('"uploads" directory created successfully.');
    }
    const formData = new FormData({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      residentialAddress: req.body.residentialAddress,
      permanentAddress: req.body.permanentAddress,
      files: [
        {
          filetype: req.body.filetype,
          file: req.file.path, // Use req.file.path to get the file path
        },
      ],
    });

    await formData.save();

    res.json({ message: 'Form data saved successfully', formData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving form data' });
  }
});

module.exports = router;
