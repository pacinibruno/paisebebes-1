import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Post = {
  id: number
  title: string
  slug: string
  content?: string // opcional porque não está sendo retornado nesse select
  created_at: string
}

export default async function BlogListPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, created_at')
    .order('created_at', { ascending: false })
    .returns<Post[]>()

  if (error) {
    console.error('Error fetching posts:', error)
    return <p>Erro ao carregar posts. Por favor, tente novamente mais tarde.</p>
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Últimos posts</h1>
        <p>Nenhum post encontrado.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Últimos posts</h1>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="block p-4 border rounded hover:bg-gray-100"
        >
          <h2 className="text-xl">{post.title}</h2>
          <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
        </Link>
      ))}
    </div>
  )
}
