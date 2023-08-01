const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  dateOfBirth: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  files: [
    {
      filetype: { type: String, required: true }, // Image or PDF
      file: { type: String, required: true }, // File path on the server where the file is stored
    },
  ],
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;