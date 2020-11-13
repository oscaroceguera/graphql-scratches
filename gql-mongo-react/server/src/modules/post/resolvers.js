import Post from './models/post.model'

const resovlers = {
  Query: {
    posts: () => Post.find({})
  },
  Mutation: {
    addPost: (parent, post) => {
      const newPost = new Post({ title: post.title, content: post.content })
      return newPost.save()
    }
  }
}

export default resovlers