"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Clock, ArrowRight, Filter } from "lucide-react";
import { Navigation } from "@/components/Navigation";

// Mock data - in production, this would come from your CMS or API
const blogPosts = [
  {
    slug: "breaking-into-tech-2024",
    title: "Breaking Into Tech in 2024: A Complete Roadmap",
    excerpt: "Navigate the evolving tech landscape with actionable strategies for career changers, from skill development to landing your first role.",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "12 min read",
    category: "Career Growth",
    tags: ["Career Change", "Tech Skills", "Job Search"],
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true
  },
  {
    slug: "remote-work-productivity",
    title: "Mastering Remote Work: Productivity Tips for Tech Professionals",
    excerpt: "Proven strategies to stay productive, maintain work-life balance, and excel in remote tech roles.",
    author: "Mike Rodriguez",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Remote Work",
    tags: ["Remote Work", "Productivity", "Work-Life Balance"],
    image: "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    slug: "ai-career-impact",
    title: "How AI is Reshaping Tech Careers in 2024",
    excerpt: "Understanding the impact of AI on different tech roles and how to position yourself for success.",
    author: "Dr. Alex Kim",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "AI & Technology",
    tags: ["Artificial Intelligence", "Future of Work", "Tech Trends"],
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    slug: "salary-negotiation-guide",
    title: "The Tech Professional's Guide to Salary Negotiation",
    excerpt: "Comprehensive strategies for negotiating compensation packages that reflect your true value.",
    author: "Jennifer Walsh",
    date: "2024-01-08",
    readTime: "15 min read",
    category: "Career Growth",
    tags: ["Salary", "Negotiation", "Career Advancement"],
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    slug: "technical-leadership-path",
    title: "From Developer to Tech Lead: Navigating the Leadership Transition",
    excerpt: "Essential skills and mindset shifts needed to successfully transition from individual contributor to technical leader.",
    author: "Robert Chang",
    date: "2024-01-05",
    readTime: "11 min read",
    category: "Leadership",
    tags: ["Leadership", "Management", "Career Progression"],
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    slug: "coding-bootcamp-vs-degree",
    title: "Coding Bootcamp vs Computer Science Degree: Which Path is Right for You?",
    excerpt: "A comprehensive comparison of educational pathways into tech, with pros, cons, and decision frameworks.",
    author: "Lisa Thompson",
    date: "2024-01-03",
    readTime: "13 min read",
    category: "Skills Development",
    tags: ["Education", "Coding Bootcamp", "Computer Science"],
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const categories = ["All", "Career Growth", "Remote Work", "AI & Technology", "Leadership", "Skills Development"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Career Insights & Tech Trends
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover actionable advice, industry insights, and success stories to accelerate your tech career.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-lg p-6 border border-border mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Latest</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-semibold mb-4">No articles found</h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search criteria or browse all categories.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="text-muted-foreground">
                  Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge>{post.category}</Badge>
                          {post.featured && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                        </div>
                      </div>
                      <CardHeader>
                        <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          By {post.author}
                        </p>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-muted-foreground mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${post.slug}`}>
                            Read
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}