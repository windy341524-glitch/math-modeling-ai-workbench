export interface ModelLesson {
  id: string;
  title: string;
  description: string;
  formulas: string[];
  steps: string[];
  example: string;
  pythonTemplateId?: string;
  matlabTemplateId?: string;
  practiceId?: string;
  nextLessonId?: string;
  previousLessonId?: string;
}

export interface ModelCategory {
  id: string;
  title: string;
  description: string;
  lessons: ModelLesson[];
}

export const EVALUATION_MODELS: ModelCategory = {
  id: 'evaluation',
  title: '评价模型 (Evaluation Models)',
  description: '用于对多个方案或对象进行综合评价和排序的模型集合。',
  lessons: [
    {
      id: 'eval-overview',
      title: '评价模型概述',
      description: '评价模型主要用于为有限个方案进行打分和排序。典型的应用场景包括：基于多个指标评选最佳方案（如最优供应商选择、最宜居城市评比等）。评价模型的核心在于如何客观、科学地赋予指标权重，以及如何聚合这些指标得出综合评分。',
      formulas: [],
      steps: [
        '明确评价对象和评价指标',
        '对指标数据进行预处理（正向化、无量纲化）',
        '确定各个指标的权重（主观如AHP，客观如熵权法）',
        '计算综合评分进行排序'
      ],
      example: '假设你要买手机，考虑价格（越低越好）、性能（越高越好）、外观（主观评价数值化）。如何综合这三项指标选出最优手机，这就是一个典型的评价问题。',
      nextLessonId: 'eval-ahp'
    },
    {
      id: 'eval-ahp',
      title: '层次分析法 (AHP)',
      description: '层次分析法（AHP）是一种主客观结合的、将半定性半定量问题转化为定量计算的评价方法。通过两两比较指标的重要性，构建判断矩阵，最终求出各自的权重。',
      formulas: ['A W = \\lambda_{max} W', 'CI = (\\lambda_{max} - n) / (n - 1)', 'CR = CI / RI'],
      steps: [
        '建立递阶层次结构模型（目标层、准则层、方案层）',
        '构造两两比较判断矩阵',
        '计算判断矩阵的最大特征根及对应的特征向量（即权重）',
        '进行一致性检验（判断 CR 是否小于 0.10）'
      ],
      example: '企业招聘时，对候选人的业务能力、团队合作、沟通能力进行两两比较打分，得出每项能力的权重，最后给候选人打综合分。',
      previousLessonId: 'eval-overview',
      nextLessonId: 'eval-entropy'
    },
    {
      id: 'eval-entropy',
      title: '熵权法 (Entropy Weight Method)',
      description: '熵权法是一种客观赋权方法。它根据各指标数据的变异程度来确定权重。如果某个指标的数据变异程度越大（信息熵越小），表明它提供的信息量越大，其权重也就越高。',
      formulas: ['p_{ij} = x_{ij} / \\sum x_{ij}', 'e_j = -k \\sum p_{ij} \\ln p_{ij}', 'w_j = (1 - e_j) / \\sum (1 - e_j)'],
      steps: [
        '数据标准化处理',
        '计算各指标的特征比重',
        '计算各指标的信息熵',
        '计算信息效用价值和最终权重'
      ],
      example: '在国家经济实力评价中，如果有十个国家，它们的 GDP 都非常接近，那么 GDP 这个指标对区分它们的作用就很小（熵大，权重低）；反之，如果贫富差距悬殊，GDP 对区分它的作用就大（熵小，权重高）。',
      previousLessonId: 'eval-ahp',
      nextLessonId: 'eval-topsis'
    },
    {
      id: 'eval-topsis',
      title: 'TOPSIS (逼近理想解排序法)',
      description: 'TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) 是一种基于距离的综合评价方法。它通过构造多目标决策问题的正理想解和负理想解，计算各候选方案到正负理想解的相对距离。',
      formulas: ['Z = (x - \\min) / (\\max - \\min)', 'D_i^+ = \\sqrt{\\sum (Z_{ij} - Z_j^+)^2}', 'S_i = D_i^- / (D_i^+ + D_i^-)'],
      steps: [
        '将原始数据矩阵统一正向化（极小型转化为极大型等）',
        '对正向化后的矩阵进行标准化处理消除量纲',
        '确定正理想解（每列最大值）和负理想解（每列最小值）',
        '计算每个方案到正负理想解的距离，进而求出相对贴近度评分'
      ],
      example: '水质评定中，如果一个湖泊的溶解氧最高，重金属含量最低，那就是正理想解。我们评估其他湖泊就是看它和这个最理想状态的相对距离。',
      pythonTemplateId: 'py-topsis',
      matlabTemplateId: 'mat-matrix', // placeholder if precise equivalent missing
      previousLessonId: 'eval-entropy',
      nextLessonId: 'eval-grey'
    },
    {
      id: 'eval-grey',
      title: '灰色关联分析',
      description: '用于研究少量、信息不完全数据中的系统相关性。通过比较对比序列和参考序列曲线的几何形状相似度，相似度越高，关联度越大。',
      formulas: ['\\gamma(x_0(k), x_i(k)) = \\frac{\\min\\min|x_0 - x_i| + \\rho\\max\\max|x_0 - x_i|}{|x_0(k) - x_i(k)| + \\rho\\max\\max|x_0 - x_i|}'],
      steps: [
        '确定参考序列和比较序列',
        '数据无量纲化处理',
        '计算关联系数（需要设定分辨系数 rho，通常取 0.5）',
        '求关联度并排序'
      ],
      example: '分析影响本市空气质量（参考序列）的多个因素，如工业废气、汽车尾气、绿化面积（比较序列），通过曲线拟合度寻找主要影响因素。',
      previousLessonId: 'eval-topsis',
      nextLessonId: 'eval-fuzzy'
    },
    {
      id: 'eval-fuzzy',
      title: '模糊综合评价',
      description: '当评价指标往往具有模糊性、难以精确定量时（如“好”、“较好”、“一般”），该模型利用模糊数学把模糊的信息转化为定量计算。',
      formulas: ['B = W \\circ R'],
      steps: [
        '确定评价因素集和评语集',
        '确定各个因素的权重（可结合 AHP）',
        '建立模糊评价矩阵 R（采用专家打分或隶属度函数）',
        '在此基础上进行模糊合成运算得出评价结果'
      ],
      example: '餐厅服务质量评价分为“非常满意、满意、一般、不满意”。顾客对“环境”选项有 60% 选满意，20% 选非常满意，通过模糊合成将这些不确定的语言边界定量化。',
      previousLessonId: 'eval-grey',
      nextLessonId: 'eval-practice'
    },
    {
      id: 'eval-practice',
      title: '评价模型综合实战',
      description: '结合所学的评价模型，解决实际的数模赛题。',
      formulas: [],
      steps: ['分析题意', '选择合适模型', '数据预处理', '编程求解并输出结果'],
      example: '实战题目：基于附件给出的不同国家各项经济与环境指标，请建立数学模型，并给出世界上最具发展潜力的10个国家的排名，并且需要分析排名的敏感性。',
      pythonTemplateId: 'py-topsis',
      matlabTemplateId: 'mat-matrix',
      previousLessonId: 'eval-fuzzy'
    }
  ]
};

export const OPTIMIZATION_MODELS: ModelCategory = {
  id: 'optimization',
  title: '优化模型 (Optimization Models)',
  description: '在给定的约束条件下，寻找目标函数的极值（最大化或最小化）。',
  lessons: [
    {
      id: 'opt-overview',
      title: '优化模型概述',
      description: '优化模型旨在寻找某个决策问题的最优解，通常包含三个核心要素：决策变量、目标函数和约束条件。根据变量类型和函数性质的区别，它分为线性、非线性、整数等多种类型。',
      formulas: ['\\min / \\max f(x)', 's.t. \\ g_i(x) \\le 0', 'h_j(x) = 0'],
      steps: [
        '确定决策变量',
        '构建目标函数（如利润最大化，成本最小化）',
        '寻找所有硬性约束与边界条件',
        '选择适合的算法与工具进行求解'
      ],
      example: '工厂生产两种产品，在原料和工时有限的情况下，如何安排两种产品的生产数量才能让总利润最高。',
      nextLessonId: 'opt-lp'
    },
    {
      id: 'opt-lp',
      title: '线性规划 (Linear Programming)',
      description: '最基础也是应用最广泛的优化模型，目标函数和所有约束条件都是线性的。解通常在可行域的顶点取得。常用的求解算法为单纯形法。',
      formulas: ['\\max c^T x', 'Ax \\le b', 'x \\ge 0'],
      steps: [
        '确认所有条件为线性',
        '化为标准型',
        '利用算法（单纯形法）沿着多面体的顶点寻找使得目标函数最大的点'
      ],
      example: '典型的资源最优分配问题、运输调度问题。',
      matlabTemplateId: 'mat-linprog',
      pythonTemplateId: 'py-preprocess', // just using an available placeholder
      previousLessonId: 'opt-overview',
      nextLessonId: 'opt-ip'
    },
    {
      id: 'opt-ip',
      title: '整数规划 (Integer Programming)',
      description: '在优化问题要求部分或全部决策变量必须取整数。常见的如 0-1 规划（只取 0 或 1）。由于可行解离散，求解难度极大（NP-hard）。',
      formulas: ['x \\in \\mathbb{Z}', 'x \\in \\{0, 1\\}'],
      steps: [
        '松弛问题：先按非整数求解',
        '分支定界法 或 割平面法',
        '逐步收缩可行域逼近最优整数解'
      ],
      example: '背包问题；选址问题（建或不建，即0-1变量）；人员排班指派问题。',
      previousLessonId: 'opt-lp',
      nextLessonId: 'opt-nlp'
    },
    {
      id: 'opt-nlp',
      title: '非线性规划 (Nonlinear Programming)',
      description: '目标函数或约束条件中包含非线性项。常常存在多个局部最优点，除非问题是凸优化问题（Convex Optimization），否则难以保证找到全局最优。',
      formulas: ['f(x) = x_1^2 + x_2^2 + \\sin(x_1)'],
      steps: [
        '写出拉格朗日函数（KKT条件）',
        '使用数值法求解：如梯度下降、牛顿法、序列二次规划(SQP)'
      ],
      example: 'Markowitz 的投资组合优化理论，目标是最小化风险（采用非线性的方差或协方差衡量），在给定预期收益的约束下。',
      previousLessonId: 'opt-ip',
      nextLessonId: 'opt-dp'
    },
    {
      id: 'opt-dp',
      title: '动态规划 (Dynamic Programming)',
      description: '把多阶段过程转化为一系列单阶段问题。利用各阶段之间的关系，逐个求解，从而求得整个过程的优化决策方案。核心是状态转移方程。',
      formulas: ['f_k(s_k) = \\max_{\\text{decisions}} [ v(s_k, u_k) + f_{k+1}(s_{k+1}) ]'],
      steps: [
        '划分阶段',
        '确定状态变量并保证无后效性',
        '写出状态转移方程',
        '寻找边界条件进行递归或递推求解'
      ],
      example: '寻找图上的最短路线、生产库存计划问题、背包问题的另一种解法。',
      previousLessonId: 'opt-nlp',
      nextLessonId: 'opt-ga'
    },
    {
      id: 'opt-ga',
      title: '遗传算法 (Genetic Algorithm)',
      description: '一种启发式搜索算法。模拟了自然界“物竞天择，适者生存”的演化法则，通过选择、交叉和变异不断繁衍出更优的解群。',
      formulas: ['P(Selection)', 'Crossover Rate', 'Mutation Rate'],
      steps: [
        '编码：将解表示为染色体（二进制或实数）',
        '初始化种群',
        '计算适应度',
        '选择、交叉、变异生成下一代直到收敛'
      ],
      example: '极为复杂的排课问题、TSP旅行商问题的大规模求解。',
      previousLessonId: 'opt-dp',
      nextLessonId: 'opt-sa'
    },
    {
      id: 'opt-sa',
      title: '模拟退火 (Simulated Annealing)',
      description: '来源于固体退火原理。为了避免陷入局部最优，它在搜索过程中以一定的概率接受一个比当前更差的解，同时随着温度下降，接受差解的概率逐渐降低至 0。',
      formulas: ['P = \\exp(-\\Delta E / (kT))'],
      steps: [
        '设定初始高温与降温系数',
        '在当前解的邻域内随机产生新解并计算目标差值',
        '按 Metropolis 准则接受或拒绝新解',
        '平稳降温直到找到近似最优'
      ],
      example: 'VLSI 电路布线设计、流水线调度问题等具有极多局部极值的场景。',
      previousLessonId: 'opt-ga',
      nextLessonId: 'opt-pso'
    },
    {
      id: 'opt-pso',
      title: '粒子群优化 (Particle Swarm Optimization)',
      description: '模仿鸟群觅食行为的启发式算法。每个“粒子”代表问题空间的一个潜在解，它们在空间中飞行，根据自己的历史最佳位置和全群的历史最佳位置来更新自己的速度和位置。',
      formulas: ['v_i(t+1) = w v_i(t) + c_1 r_1 (pbest_i - x_i) + c_2 r_2 (gbest - x_i)'],
      steps: [
        '初始化粒子群的位置及速度',
        '评估每个粒子的适应度',
        '更新个体极值(pbest)与全局极值(gbest)',
        '更新每个粒子的速度与位置，迭代至结束'
      ],
      example: '多参数连续函数的函数寻优、神经网络训练的超参数优化等。',
      previousLessonId: 'opt-sa',
      nextLessonId: 'opt-practice'
    },
    {
      id: 'opt-practice',
      title: '优化模型综合实战',
      description: '解决带有多种约束的复杂资源配置问题。',
      formulas: [],
      steps: ['建立目标与约束方程', '选择算法并编程实现', '敏感性分析', '解释结果'],
      example: '交巡警服务平台的设置与调度问题，在给定城市各个报警点的分布与时间后，要求布置最少的警务平台以满足所有的反应时间需求。',
      matlabTemplateId: 'mat-linprog',
      pythonTemplateId: 'py-preprocess',
      previousLessonId: 'opt-pso'
    }
  ]
};

export const MODEL_COURSES = [EVALUATION_MODELS, OPTIMIZATION_MODELS];
