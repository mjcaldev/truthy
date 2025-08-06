import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { HTMLAttributes, ReactNode } from "react";

interface CodeProps extends HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

export const markdownComponents: Components = {
  code: ({ inline, className, children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");
    const syntaxStyle = oneDark as any;

    return !inline && match ? (
      <SyntaxHighlighter
        style={syntaxStyle}
        language={match[1]}
        PreTag="div"
        className="rounded-lg"
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/50 pl-6 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
};