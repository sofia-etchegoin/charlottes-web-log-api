import connection from './connection.ts'
import { Post, PostData, PostUpdate } from '../../models/post.ts'

//GET all posts
export async function getAllPostsDb(): Promise<Post> {
  try {
    const posts = await connection('posts').select(
      'id',
      'title',
      'date_created as dateCreated',
      'text'
    )
    return posts
  } catch (error: any) {
    console.error(`Error in getAllPostsDb: ${error.message}`)
    throw error
  }
}

//ADD a post
export async function addPostDb(post: PostData) {
  try {
    const [addedPost] = await connection('posts')
      .insert({
        title: post.title,
        text: post.text,
        date_created: new Date(),
      })
      .returning(['id', 'title', 'date_created as dateCreated', 'text'])

    return addedPost
  } catch (error: any) {
    console.error(`Error in addPostDb: , ${error.message}`)
    throw error
  }
}

//UPDATE a post
export async function updatePostDb(postId: number, updatedPostData: any) {
  try {
    const [updatedPost] = await connection('posts')
      .update({
        title: updatedPostData.title,
        text: updatedPostData.text,
        date_created: new Date(),
      })
      .where({ id: postId })
      .returning(['id', 'title', 'date_created as dateCreated', 'text'])

    return updatedPost
  } catch (error: any) {
    console.error(`Error in updatePostDb: ${error.message}`)
    throw error
  }
}

//DELETE a post
export async function deletePostDb(postId: number) {
  try {
    // Delete the post and return the number of affected rows
    const deletedPostCount = await connection('posts')
      .where({ id: postId })
      .del()

    if (deletedPostCount > 0) {
      // If the post was deleted, delete associated comments
      await connection('comments').where({ post_id: postId }).del()
    }

    return deletedPostCount
  } catch (error: any) {
    console.error(`Error in deletePostDb: ${error.message}`)
    throw error
  }
}
