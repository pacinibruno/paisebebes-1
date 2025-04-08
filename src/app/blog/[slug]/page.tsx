// src/app/blog/[slug]/page.tsx
import { supabase } from '@/lib/supabase'

type PageProps = {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error) {
    return <p>Post não encontrado.</p>
  }

  return (
    <article className="prose max-w-2xl mx-auto p-4">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        Publicado em {new Date(post.published_at).toLocaleDateString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
