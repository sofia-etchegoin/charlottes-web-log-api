import express from 'express'
import * as db from '../db/db'

const router = express.Router()

export default router

// GET '/api/v1/posts'
router.get('/', async (req, res) => {
  try {
    const posts = await db.getAllPostsDb()
    res.json(posts)
  } catch (error: any) {
    console.error(`Error getting all posts from server: ${error.message}`)
    return error
  }
})

//POST '/api/v1/posts'
router.post('/', async (req, res) => {
  const post = req.body
  try {
    const addedPost = await db.addPostDb(post)
    res.json(addedPost)
  } catch (error: any) {
    console.error(`Error adding a post from server: ${error.message}`)
    return error
  }
})
