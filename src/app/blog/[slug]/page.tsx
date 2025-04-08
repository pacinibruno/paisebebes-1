// src/app/blog/[slug]/page.tsx
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: Props) {
  if (!params?.slug) {
    return notFound()
  }

  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', params.slug)
      .single()

    if (error) {
      console.error('Error fetching post:', error)
      throw error
    }

    if (!post) {
      return notFound()
    }

    return (
      <article className="prose max-w-2xl mx-auto p-4">
        <h1>{post.title}</h1>
        <p className="text-sm text-gray-500">
          Publicado em {new Date(post.created_at).toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    )
  } catch (error) {
    console.error('Error in BlogPostPage:', error)
    return notFound()
  }
}

// Pré-renderiza os slugs no build (SSG)
export async function generateStaticParams() {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug')

    if (error) {
      console.error('Error fetching slugs:', error)
      return []
    }

    if (!posts) return []

    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}
