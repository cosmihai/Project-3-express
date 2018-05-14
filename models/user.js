'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const userSchema = new Schema({
  username: String,
  password: String,
  pictureUrl: {
    type:String,
    default: 'https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.49.247675.JPG'
  },
  firstName: String,
  lastName: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;