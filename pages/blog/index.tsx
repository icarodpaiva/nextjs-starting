import Link from "next/link"
import { Post } from "../../types/Post"

interface BlogProps {
  name: string
  posts: Post[]
}

const Blog = ({ name, posts }: BlogProps) => {
  return (
    <div>
      <h1>It's a blog home</h1>
      <p>My name is {name}</p>

      <h2>Static infos</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const req = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts: Post[] = await req.json()

  return {
    props: {
      name: "icaro",
      posts,
      // if there is any request after 2h, make a new request
      revalidate: 60 * 60 * 2
    }
  }
}

export default Blog
