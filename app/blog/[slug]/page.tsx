import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPost } from "@/components/BlogPost";

// Mock data - in production, this would come from your CMS or API
const blogPosts = [
  {
    slug: "breaking-into-tech-2024",
    title: "Breaking Into Tech in 2024: A Complete Roadmap",
    content: `...`, // trimmed for brevity
    excerpt:
      "Navigate the evolving tech landscape with actionable strategies for career changers, from skill development to landing your first role.",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "12 min read",
    category: "Career Growth",
    tags: ["Career Change", "Tech Skills", "Job Search"],
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

// Use the type Next.js expects
interface PageProps {
  params: {
    slug: string;
  };
}

// Correct typing for generateMetadata (Next.js expects a non-Promise here)
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Truthy.io",
    };
  }

  return {
    title: `${post.title} - Truthy.io`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

// Correct default export signature
export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
    return null;
  }

  return <BlogPost post={post} />;
}

export function generateStaticParams(): Array<{params: { slug: string } }>
{
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));
}
