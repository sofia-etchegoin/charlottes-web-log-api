import express from 'express'
import * as db from '../db/db'

// eslint-disable-next-line no-unused-vars

const router = express.Router()

export default router

//GET comments '/api/v1/posts/${postId}/comments'

router.get('/posts/:postId/comments', async (req, res) => {
  const postId = Number(req.params)
  try {
    const comments = await db.getAllCommentsDb(postId)
    res.json(comments)
  } catch (error: any) {
    console.error(`Error in getting all comments in server`)
    res.json({ error: 'Internal Server Error' })
  }
})
