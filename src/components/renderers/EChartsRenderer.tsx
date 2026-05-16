import React from 'react';
import ReactECharts from 'echarts-for-react';

interface EChartsRendererProps {
  option: any;
  height?: string;
}

export default function EChartsRenderer({ option, height = '300px' }: EChartsRendererProps) {
  // Ensure option is a valid object
  const validOption = typeof option === 'string' ? JSON.parse(option) : option;

  return (
    <div className="bg-surface-container/30 p-4 rounded-2xl border border-surface-dim/30 my-4 shadow-inner">
      <ReactECharts
        option={validOption}
        style={{ height: height, width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
