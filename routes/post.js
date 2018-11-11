const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
router.get('/', async (req, res) => {
  let posts = await Post.find({})
  res.status(200).json(posts)
})
router.post('/', async (req, res) => {
  let postData = {
    title: req.body.title,
    text: req.body.text
  }
  let post = new Post(postData)
  await post.save()
  res.status(201).json(post)
})
router.delete('/:postId', async (req, res) => {
  await Post.remove({ _id: req.params.postId })
  res.status(200).json({ message: 'Delete' })
})
module.exports = router