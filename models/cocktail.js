'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const cocktailSchema = new Schema({
  name: String,
  glass: String,
  category: {
    type: String,
    default: 'All day cocktail'
  },
  ingredients:[
    {
    unit: String,
    amount: Number,
    ingredient: String,
    label: String,
    }
  ],
  garnish: String,
  preparation: String,
  isIBA: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0QpS-8Df6hhN8c-JtN6bOuoz569eHUCjZu3zrYaIbKg-u3dY'
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  }
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;
