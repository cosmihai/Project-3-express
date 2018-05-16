'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const userSchema = new Schema({
  username: String,
  password: String,
  pictureUrl: {
    type:String,
    default: 'https://cdn.dribbble.com/users/1343641/screenshots/3132305/bartender_appreciation_day_1x.png'
  },
  firstName: String,
  lastName: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;