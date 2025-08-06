import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPost } from "@/components/BlogPost";

const blogPosts = [
  {
    slug: "breaking-into-tech-2024",
    title: "Breaking Into Tech in 2024: A Complete Roadmap",
    content: `...`, // your actual markdown/content
    excerpt: "Navigate the evolving tech landscape...",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "12 min read",
    category: "Career Growth",
    tags: ["Career Change", "Tech Skills"],
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

// `generateStaticParams()` - return plain array, no async
export function generateStaticParams(): Array<{ params: { slug: string } }> {
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));
}

// generateMetadata - still async, returns Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: "Post Not Found - Truthy.io" };
  }

  return {
    title: `${post.title} - Truthy.io`,
    description: post.excerpt,
  };
}

// Correct component signature — NOT async
export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
    return null;
  }

  return <BlogPost post={post} />;
}