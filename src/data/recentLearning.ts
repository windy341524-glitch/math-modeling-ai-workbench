import { Clock, CheckCircle2, PlayCircle, BookOpen, Calculator, Code2, MapPin } from 'lucide-react';
import React from 'react';

export type RecentItemType = 'lesson' | 'model' | 'bookChapter' | 'codeTemplate' | 'paperPrompt' | 'practiceCase';

export interface RecentItem {
  id: string;
  title: string;
  type: RecentItemType;
  category: string;
  description: string;
  progress: number;
  lastOpenedAt: string;
  targetPage: string;
  targetParams?: Record<string, any>;
  tags: string[];
}

export const RECENTLY_STUDIED: RecentItem[] = [
  {
    id: '1',
    title: '评价模型概述',
    type: 'lesson',
    category: '评价模型',
    description: '评价模型主要用于为有限个方案进行打分和排序。',
    progress: 90,
    lastOpenedAt: '15分钟前',
    targetPage: 'model_lesson',
    targetParams: { categoryId: 'evaluation', lessonId: 'eval-overview' },
    tags: ['模型学习', '基础'],
  },
  {
    id: '2',
    title: 'TOPSIS (逼近理想解排序法)',
    type: 'model',
    category: '评价模型',
    description: '一种基于距离的综合评价方法。',
    progress: 40,
    lastOpenedAt: '2小时前',
    targetPage: 'model_lesson',
    targetParams: { categoryId: 'evaluation', lessonId: 'eval-topsis' },
    tags: ['中级', '评价模型'],
  },
  {
    id: '3',
    title: '数据预处理模块',
    type: 'codeTemplate',
    category: 'Python 数据分析',
    description: '使用 pandas 进行缺失值填补和简单的标准化。',
    progress: 100,
    lastOpenedAt: '昨天',
    targetPage: 'playground',
    targetParams: { initialTab: 'python', initialTemplateId: 'py-preprocess' },
    tags: ['代码实践'],
  },
  {
    id: '4',
    title: '第 1 章：微积分与极值',
    type: 'bookChapter',
    category: '数学基础',
    description: '极限、求导、泰勒展开及极值条件',
    progress: 20,
    lastOpenedAt: '3天前',
    targetPage: 'math_foundation',
    targetParams: { chapterId: 1 },
    tags: ['书籍阅读'],
  }
];
