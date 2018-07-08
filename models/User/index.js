const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false },
  preferences: {
    itemsPerPage: {
      type: Number,
      default: 10
    }
  }
})

module.exports = mongoose.model('User', UserSchema)
