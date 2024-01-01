import express from 'express'
import * as db from '../db/db'

// eslint-disable-next-line no-unused-vars

const router = express.Router()

export default router

//PATCH '/v1/comments/:commentId'
router.patch('/:commentId', async (req, res) => {
  const commentId = Number(req.params.commentId)
  const { comment } = req.body
  try {
    const updatedComment = await db.updateCommentDb(commentId, comment)
    if (updatedComment) {
      res.json(updatedComment)
    } else {
      res.json({ error: 'Comment not found' })
    }
  } catch (error: any) {
    console.error(`Error updating comment in server: ${error.message}`)
    res.json({ error: 'Internal Server Error' })
  }
})

//DELETE '/v1/comments/:commentId'
router.delete('/:commentId', async (req, res) => {
  const commentId = Number(req.params.commentId)
  try {
    const deletedComment = await db.deleteCommentDb(commentId)
    res.json(deletedComment)
  } catch (error: any) {
    console.error(`Error in deleting comment in server: ${error.message}`)
    throw error
  }
})
