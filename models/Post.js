const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const PostScheme = new Scheme({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('posts', PostScheme)
