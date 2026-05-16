# 数学建模 AI 工作台 (Smart Modeling Workbench)

这是一个基于 AI 的数学建模全流程工作台，提供从题目分析、模型建立、公式推演到代码生成的一站式服务。

## 主要功能
- **智能对话**：针对数学建模场景优化的 AI 助理。
- **结构化输出**：自动生成 LaTeX 公式、Mermaid 流程图、ECharts 图表和 Python/MATLAB 代码。
- **项目管理**：保存您的建模历史和生成的资产。
- **学习中心**：内置数学建模基础教程和案例。

## 技术栈
- **前端**：React, Vite, TailwindCSS, Lucide-React
- **后端**：Node.js, Express
- **数据库/鉴权**：Supabase
- **AI 引擎**：DeepSeek / OpenAI / Gemini (通过后端转发)

## 本地运行
1. 配置 `.env` 文件（参考 `.env.example`）。
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`
