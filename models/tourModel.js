const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], // we send this error message if the name is not provided
    unique: true, // we dont have two tours with the same name
  },
  rating: {
    type: Number,
    default: 4.5, // default value if no rating is provided
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
