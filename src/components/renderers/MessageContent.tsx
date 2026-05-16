import React from 'react';
import LaTeXRenderer from './LaTeXRenderer';
import MermaidRenderer from './MermaidRenderer';
import EChartsRenderer from './EChartsRenderer';

interface MessageContentProps {
  content: string;
}

export default function MessageContent({ content }: MessageContentProps) {
  // Regex to find specialized blocks
  const parts = content.split(/(```mermaid[\s\S]*?```|```json:echarts[\s\S]*?```)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (part.startsWith('```mermaid')) {
          const chart = part.replace('```mermaid', '').replace('```', '').trim();
          return <MermaidRenderer key={index} chart={chart} />;
        } else if (part.startsWith('```json:echarts')) {
          const optionStr = part.replace('```json:echarts', '').replace('```', '').trim();
          try {
            const option = JSON.parse(optionStr);
            return <EChartsRenderer key={index} option={option} />;
          } catch (e) {
            return <pre key={index} className="bg-error/10 p-2 rounded text-xs">Invalid ECharts JSON</pre>;
          }
        } else {
          return <LaTeXRenderer key={index} content={part} />;
        }
      })}
    </div>
  );
}
