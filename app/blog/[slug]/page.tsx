import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPost } from "@/components/BlogPost";

// Mock data - replace with CMS or API later
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

// Update params to non-Promise version (this is better practice in App Router)
interface PageProps {
  params: {
    slug: string;
  };
}

// generateStaticParams returns an array of slugs
export function generateStaticParams(): Array<{ slug: string }> {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// generateMetadata now handles async/await
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Truthy.io",
    };
  }

  return {
    title: `${post.title} - Truthy.io`,
    description: post.excerpt,
  };
}

// Component is now async
export default async function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}