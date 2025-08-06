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

// Next.js 15 requires params to be a Promise
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// generateStaticParams returns an array of params objects
export function generateStaticParams(): Array<{ params: { slug: string } }> {
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));
}

// generateMetadata must await params in Next.js 15
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

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

// Component must be async and await params in Next.js 15
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}