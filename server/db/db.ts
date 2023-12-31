import connection from './connection.ts'
import { Post, PostData } from '../../models/post.ts'

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
    return error
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
    console.error('Error in addPostDb:', error.message)
    return error
  }
}
