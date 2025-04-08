import { createServerSupabaseClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Post {
  title: string
  content: string
  created_at: string
  slug: string
  description?: string
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createServerSupabaseClient()
  
  const { data: post } = await supabase
    .from('posts')
    .select('title,description')
    .eq('slug', params.slug)
    .single()

  return {
    title: post?.title ?? 'Post não encontrado',
    description: post?.description ?? 'Conteúdo do blog Pais e Bebês',
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !post) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-white py-8">
      <article className="prose lg:prose-xl max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600">
            Publicado em {new Date(post.created_at).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </header>
        <div 
          className="prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </main>
  )
}

export async function generateStaticParams() {
  const supabase = createServerSupabaseClient()

  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug')

    if (error) {
      console.error('Error fetching posts for static params:', error)
      return []
    }

    return (posts || []).map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}
