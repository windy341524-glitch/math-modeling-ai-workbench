import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#24389C',
    primaryTextColor: '#fff',
    primaryBorderColor: '#24389C',
    lineColor: '#5C6D8C',
    secondaryColor: '#E9EEFF',
    tertiaryColor: '#f4f4f4',
  }
});

interface MermaidRendererProps {
  chart: string;
}

export default function MermaidRenderer({ chart }: MermaidRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && chart) {
      ref.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="bg-surface-container/30 p-4 rounded-2xl border border-surface-dim/30 my-4 overflow-x-auto flex justify-center">
      <div ref={ref} className="mermaid">
        {chart}
      </div>
    </div>
  );
}
