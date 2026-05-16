import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface LaTeXRendererProps {
  content: string;
  className?: string;
}

export default function LaTeXRenderer({ content, className = '' }: LaTeXRendererProps) {
  return (
    <div className={`prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-surface-container prose-pre:border prose-pre:border-surface-dim/50 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className={className} {...props}>
                <code>{children}</code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
