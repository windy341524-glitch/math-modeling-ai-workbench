export type PromptCategory = 
  | '问题分析'
  | '模型选择'
  | '数据处理'
  | '假设与公式'
  | '各类模型 (预测/评价/优化)'
  | '代码生成'
  | '图表与可视化'
  | '论文与分析'
  | '答辩与展示'
  | '自定义';

export type PromptDifficulty = '初级' | '中级' | '高级';

export interface PromptItem {
  id: string;
  title: string;
  category: PromptCategory;
  difficulty: PromptDifficulty;
  description: string;
  content: string;
  tags: string[];
  usageCount?: number;
  userCreated?: boolean;
  sourceType?: 'builtIn' | 'customizedFromBuiltIn' | 'blankCreated';
  lastUsedAt?: string;
}

export const OFFICIAL_PROMPTS: PromptItem[] = [
  // 问题分析
  {
    id: 'p1',
    title: '拆解复杂系统问题',
    category: '问题分析',
    difficulty: '中级',
    description: '最适合需要层次化变量隔离的多阶段环境模型或综合问题。用于赛题最初的分析。',
    content: '扮演数学建模专家。请帮我将以下系统/问题分解为多个子问题或子系统，提取所有可能影响结果的变量，并说明哪些是关键决策变量，哪些是环境变量。请根据题目描述：[填入题目描述]',
    tags: ['背景分析', '思路构建']
  },
  {
    id: 'p2',
    title: '数据特征与需求分析',
    category: '问题分析',
    difficulty: '初级',
    description: '当题目给出了大量数据时，用于初步确定数据分析方向。',
    content: '我有一份关于[填入数据主题]的数据，包含[列出主要字段]。请帮我分析：1) 需要进行哪些数据预处理？2) 应该提取哪些核心特征？3) 这份数据最适合用来回答什么类型的建模问题（预测、分类、聚类还是评价）？',
    tags: ['数据驱动', '赛题解读']
  },
  
  // 模型选择
  {
    id: 'p3',
    title: '模型选型与对比评估',
    category: '模型选择',
    difficulty: '中级',
    description: '针对特定问题类型，要求AI提供可供选择的多个模型，并对比优缺点。',
    content: '我的研究目标是[填入目标，如：预测未来商品销量/评价不同城市的宜居程度]。我的数据量是[大/小]，时间是[连续/离散]。请为我推荐3种适合的数学模型，并以表格形式对比它们的优点、缺点、数据要求和计算复杂度。',
    tags: ['方案筛选', '对比分析']
  },

  // 假设与公式
  {
    id: 'p4',
    title: '模型假设生成',
    category: '假设与公式',
    difficulty: '中级',
    description: '帮助生成严谨的、为简化模型而必需的合理假设。',
    content: '我正在解决[填入问题背景]的问题，准备使用[填入模型名称]模型核心。为了使模型能够在数学上可解且不脱离实际，请帮我列出5-7条严谨的模型假设，并简要说明每条假设的合理性。',
    tags: ['论文结构', '严谨性检查']
  },
  {
    id: 'p5',
    title: '公式与符号规范化',
    category: '假设与公式',
    difficulty: '初级',
    description: '规范论文中的公式形式，提取每个参数，并建议一致的希腊字母分配。',
    content: '请分析以下关于[填入模型类型]的大致方程描述，帮我写出标准的数学公式表达式（使用LaTeX）。同时，提取每个参数，并根据学术标准建立一个统一的符号说明表（Symbol，Description，Unit）。',
    tags: ['LaTeX', '符号表']
  },

  // 各类模型
  {
    id: 'p6',
    title: '建立客观评价体系',
    category: '各类模型 (预测/评价/优化)',
    difficulty: '中级',
    description: '使用熵权法或AHP等构建评价体系指标体系的引导。',
    content: '我想对[填入评价对象，如：湖泊水质]进行综合评价。目前我初步考虑的指标有[列出已有指标]，请帮我完善这是一个全面科学的评价指标体系，划分为一级、二级指标，并推荐适合确定这些指标权重的模型组合（如AHP-熵权法），说明操作步骤。',
    tags: ['综合评价', '指标构建']
  },
  {
    id: 'p7',
    title: '多目标优化建模',
    category: '各类模型 (预测/评价/优化)',
    difficulty: '高级',
    description: '构建包含目标函数、决策变量、约束条件的严密多目标优化问题。',
    content: '我正在处理一个多目标优化问题。背景是[填入背景]。我的目标之一是[极大化A]，目标之二是[极小化B]。请帮我：1) 定义决策变量；2) 写出目标函数的数学表达式；3) 提取并数学化所有的约束条件（不等式和等式）；4) 推荐适合的求解算法（如NSGA-II或加权求和法）。',
    tags: ['优化模型', '运筹学']
  },

  // 代码生成
  {
    id: 'p8',
    title: 'Python 数据分析与Pandas速成',
    category: '代码生成',
    difficulty: '初级',
    description: '让AI生成用于数据读取、清洗和预处理的Pandas代码。',
    content: '我有一个名为`data.csv`的数据集。请用Python编写一段具有良好注释的代码，完成以下操作：1) 读取数据并打印基本信息；2) 查找并用插值法填充缺失值；3) 删除重复行；4) 利用Z-score方法剔除异常值；5) 将最终清洗后的数据保存为`cleaned_data.csv`。',
    tags: ['预处理', 'Python']
  },
  {
    id: 'p9',
    title: 'MATLAB 求解微分方程',
    category: '代码生成',
    difficulty: '中级',
    description: '生成MATLAB中基于ode45的常微分方程求解代码，适合动力学模型。',
    content: '我构建了一个SIR传染病模型，其常微分方程组为: dS/dt = -beta*S*I, dI/dt = beta*S*I - gamma*I, dR/dt = gamma*I。请为我编写MATLAB代码，使用 ode45 对其进行数值求解，并绘制S, I, R随时间变化的曲线图。明确写清楚初始条件和参数赋值的地方，方便我修改。',
    tags: ['MATLAB', '微分方程']
  },

  // 图表与可视化
  {
    id: 'viz1',
    title: '选择合适的可视化图表',
    category: '图表与可视化',
    difficulty: '初级',
    description: '不知道该用什么图表展示结果时，向AI提问寻求建议。',
    content: '我的数据包含[例如：5个不同城市在10年里的GDP和人口变化]。我想在一张图中直观地展示它们的发展轨迹和关联。请推荐3种最优秀的数据可视化图表类型（如气泡动态图、双y轴折线图、极坐标图等），说明适用范围并告诉我适合使用Python的哪个库（matplotlib, seaborn还是plotly）来实现。',
    tags: ['图表设计', '表达技巧']
  },
  {
    id: 'viz2',
    title: '热力图相关系数分析代码',
    category: '图表与可视化',
    difficulty: '中级',
    description: '生成绘制美观的高级特征相关系数热力图代码。',
    content: '请给我一段Python/Seaborn代码，用于读取包含多个数值特征的数据后，计算Pearson相关系数，并绘制高分辨率的热力图。要求：采用冷暖双色渐变色图（如coolwarm），屏蔽对角线以上的重复部分（mask），并在每个格子上标注保留两位小数的数值。',
    tags: ['热力图', '相关性']
  },
  {
    id: 'viz3',
    title: '网络拓扑图生成 (NetworkX)',
    category: '图表与可视化',
    difficulty: '高级',
    description: '适用于图论模型、交通排班、网络传播分析。',
    content: '帮我用Python的NetworkX库写一段代码，生成一个加权无向图。图包含至少[填入节点数量]个节点。要求：1) 节点大小根据其度中心性(degree centrality)变化；2) 边的粗细或颜色反映权重大小；3) 使用 force-directed (如spring_layout)进行美观的布局；4) 为核心节点画出高亮标签。',
    tags: ['网络图', '图论']
  },
  {
    id: 'viz4',
    title: '雷达图与多维对比展示',
    category: '图表与可视化',
    difficulty: '中级',
    description: '用于综合评价模型结果对比，例如多个方案在5个指标上的得分。',
    content: '我用TOPSIS和AHP得到了4个备选方案在5个评价指标（成本、效果、环保、速度、风险）上的归一化得分。请提供用于绘制美观“多边形雷达图 (Radar Chart)”的Python代码，并将4个方案填充不同的颜色透明度，以便放在论文的结论部分。',
    tags: ['雷达图', '评价结果']
  },
  {
    id: 'viz5',
    title: '地理空间分布图 (Geographic Map)',
    category: '图表与可视化',
    difficulty: '高级',
    description: '物流选址、灾难扩散等需要用到地图的可视化。',
    content: '我有一组包含经纬度坐标以及对应数值属性的数据点。需要利用Python的 folium 或 geopandas 库绘制带有热力分布的地理散点图。请提供代码示例，支持将不同类别的坐标点用不同颜色标记，并输出为交互式HTML或高分辨率底图。',
    tags: ['地图分布', '地理数据']
  },

  // 论文与分析
  {
    id: 'p10',
    title: '结果分析与讨论润色',
    category: '论文与分析',
    difficulty: '中级',
    description: '根据模型的数字输出，让AI帮忙进行有深度的理论解读取代干瘪的描述。',
    content: '我的模型运行结果如下：[填入部分输出数据或准确率/R平方值]。请帮我针对这个结果写一段专业学术风格的分析讨论（约300字）。要求不仅描述表面数据的升降，还要解释其背后蕴含的物理/社会经济学意义，以及可能存在的模型局限性（敏感性分析切入点）。',
    tags: ['结果解读', '润色']
  },
  {
    id: 'p11',
    title: '撰写摘要 (O-I-M-R-C框架)',
    category: '论文与分析',
    difficulty: '高级',
    description: '在完成整篇论文后，利用AI提取核心精华，生成符合大奖标准的摘要。',
    content: '以下是我论文的核心内容梳理：[简述问题、所用模型、核心创新点、最终结论数值]。请帮我使用由目标(Objective)-输入(Input)-方法(Method)-结果(Result)-结论(Conclusion)构成的逻辑框架，撰写一篇规范的数学建模比赛论文摘要。语言要求学术、客观、干练，控制在600字以内，并提取5个关键词。',
    tags: ['摘要写作', '重点提炼']
  },

  // 答辩与展示
  {
    id: 'p12',
    title: '答辩 PPT 大纲规划',
    category: '答辩与展示',
    difficulty: '初级',
    description: '把数万字的论文浓缩为10-15分钟的答辩幻灯片结构。',
    content: '我已经完成了一篇关于[填入题目]的数模论文。要在[填入时间，如: 10]分钟内进行口头答辩。请为我规划一份 PPT 大纲（约12-15页）。要求详细说明每一页的标题、需要放入核心内容/图表（如"放权重分布饼图"），以及对应的口头演讲的核心一句话。',
    tags: ['PPT结构', '答辩演示']
  }
];
