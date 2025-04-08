import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  if (!params?.slug) return notFound()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !post) return notFound()

  return (
    <article className="prose max-w-2xl mx-auto p-4">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        Publicado em {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}