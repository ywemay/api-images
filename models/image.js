const mongoose = require('mongoose');

const schemaDefinition = {
  path: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  used: [{
    scope: {type: String, required: true},
    id: mongoose.Types.ObjectId,
  }]
}

const imageSchema = new mongoose.Schema(schemaDefinition);
const imageModel = mongoose.model('images', imageSchema);

module.exports = imageModel