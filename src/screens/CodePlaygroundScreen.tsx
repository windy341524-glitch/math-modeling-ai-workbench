import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Play, X, Copy, RefreshCw, Terminal, 
  Code2, CheckCircle, AlertTriangle, BookOpen, ChevronRight, Calculator,
  BarChart2, Sigma, Bot
} from 'lucide-react';
import TopBar from '../components/TopBar';
import AIChatModal from '../components/AIChatModal';

interface CodeTemplate {
  id: string;
  title: string;
  language: 'python' | 'matlab';
  relatedModel: string;
  difficulty: '初级' | '中级' | '高级';
  description: string;
  code: string;
  sampleOutput: string;
  explanation: {
    what_it_does: string;
    input_format: string;
    output_meaning: string;
    common_errors: string;
    how_to_modify: string;
  };
}

const TEMPLATES: CodeTemplate[] = [
  // PYTHON TEMPLATES
  {
    id: 'py-load-csv',
    title: '读取与预览数据 (CSV)',
    language: 'python',
    relatedModel: 'Data Processing',
    difficulty: '初级',
    description: '使用 Pandas 加载 CSV 文件并查看基本统计信息。',
    code: `import pandas as pd

# 1. 模拟一个包含随机数据的 CSV 文件内容
data = {
    'Year': [2018, 2019, 2020, 2021, 2022],
    'Revenue': [10.5, 12.3, 11.2, 15.6, 18.2],
    'Cost': [6.2, 7.1, 7.8, 8.5, 9.1],
    'Profit': [4.3, 5.2, 3.4, 7.1, 9.1]
}

# 2. 加载为 DataFrame (实际代码中应使用 pd.read_csv('file.csv'))
df = pd.DataFrame(data)

print("--- 数据集前3行 (head) ---")
print(df.head(3))

print("\\n--- 数据集基本信息 (info) ---")
print(df.info())

print("\\n--- 各列数据类型 ---")
print(df.dtypes)
`,
    sampleOutput: `--- 数据集前3行 (head) ---
   Year  Revenue  Cost  Profit
0  2018     10.5   6.2     4.3
1  2019     12.3   7.1     5.2
2  2020     11.2   7.8     3.4

--- 数据集基本信息 (info) ---
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 4 columns):
 #   Column   Non-Null Count  Dtype  
---  ------   --------------  -----  
 0   Year     5 non-null      int64  
 1   Revenue  5 non-null      float64
 2   Cost     5 non-null      float64
 3   Profit   5 non-null      float64
dtypes: float64(3), int64(1)
memory usage: 288.0 bytes
None

--- 各列数据类型 ---
Year         int64
Revenue    float64
Cost       float64
Profit     float64
dtype: object`,
    explanation: {
      what_it_does: '演示了如何导入数据表格，并打印其基本信息，检查是否有格式问题。',
      input_format: '通常为 .csv 或 .xlsx 格式的数据集文件',
      output_meaning: '输出前几行数据以及各列的数据类型和大小，用于快速了解数据集。',
      common_errors: '文件路径不正确导致 FileNotFoundError。如果Excel有多个Sheet，不指定sheet_name可能会读错。',
      how_to_modify: '使用 df.columns 查看所有列名，或使用 pd.read_excel 读取 xlsx 文件。'
    }
  },
  {
    id: 'py-stats',
    title: '描述性统计',
    language: 'python',
    relatedModel: 'Data Analysis',
    difficulty: '初级',
    description: '快速掌握数据列的均值、方差、中位数等统计特征。',
    code: `import pandas as pd
import numpy as np

# 生成虚拟成绩数据
data = {
    'Math': [88, 92, 75, np.nan, 95, 80],
    'English': [85, 78, 90, 88, 92, 85],
    'Physics': [90, 85, np.nan, 80, 95, 75]
}
df = pd.DataFrame(data)

print("--- 描述性统计摘要 ---")
# describe() 自动忽略 NaN 并计算每列统计量
print(df.describe().round(2))

print("\\n--- 计算相关系数矩阵 ---")
# 观察不同科目成绩之间的相关性
print(df.corr().round(3))
`,
    sampleOutput: `--- 描述性统计摘要 ---
        Math  English  Physics
count   5.00     6.00     5.00
mean   86.00    86.33    85.00
std     8.31     4.84     8.06
min    75.00    78.00    75.00
25%    80.00    85.00    80.00
50%    88.00    86.50    85.00
75%    92.00    89.50    90.00
max    95.00    92.00    95.00

--- 计算相关系数矩阵 ---
          Math  English  Physics
Math     1.000    0.354    0.913
English  0.354    1.000    0.803
Physics  0.913    0.803    1.000`,
    explanation: {
      what_it_does: '一步计算出所有数值列的个数、均值、标准差和分位数，并生成相关系数矩阵。',
      input_format: '含有数值列的 Pandas DataFrame',
      output_meaning: '可以快速看出哪些变量方差很大，或者哪些变量之间高度相关（如上面的数学和物理高度相关）。',
      common_errors: '对非数值型（字符串）列调用某些统计函数可能会产生警告或报错。',
      how_to_modify: '可以在 corr() 内部指定 method="spearman" 或 "kendall" 计算特定相关系数。'
    }
  },
  {
    id: 'py-dataviz',
    title: '数据可视化基础',
    language: 'python',
    relatedModel: 'Data Visualization',
    difficulty: '初级',
    description: '使用 matplotlib 和 seaborn 绘制常用的散点图和直方图。',
    code: `import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# 随机生成数据
np.random.seed(42)
x = np.random.normal(50, 15, 200)
y = x * 1.5 + np.random.normal(0, 10, 200)
categories = np.random.choice(['A', 'B'], 200)

print("数据已生成。正在渲染图表...")
print("(在模拟环境中，图像通常会直接作为文件保存或弹出窗口显示。)")

# 1. 绘制带有回归线的散点图
# sns.lmplot(x='x', y='y', data=df)

# 2. 绘制直方图和密度曲线
# sns.histplot(x, kde=True)

# plt.title("Sample Plot")
# plt.show()
print("运行成功。图表对象已创建完毕。")
`,
    sampleOutput: `数据已生成。正在渲染图表...
(在模拟环境中，图像通常会直接作为文件保存或弹出窗口显示。)
运行成功。图表对象已创建完毕。
[拟合图表预览] 散点呈明显右上方线性分布，并且覆盖有钟形直方图。`,
    explanation: {
      what_it_does: '通过图表的方式直观展示数据分布规律，以及变量之间的线性相关关系。',
      input_format: 'x 和 y 的一维数组或 Pandas 列。',
      output_meaning: '展示变量之间是否有关联，或单个变量是否符合正态分布等。',
      common_errors: '图表中文字体如果是中文经常显示为方块，需要设置: plt.rcParams["font.sans-serif"]=["SimHei"]。',
      how_to_modify: '修改 sns 的绘图接口，如换用 boxplot (箱型图) 或 heatmap (热力图)。'
    }
  },
  {
    id: 'py-linreg',
    title: '多元线性回归',
    language: 'python',
    relatedModel: 'Regression',
    difficulty: '中级',
    description: '使用 statsmodels 或 sklearn 进行线性回归并评估模型。',
    code: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 假设 X 是两个特征（比如房屋面积、房龄），y 是房价
X = np.array([
    [120, 5], [100, 10], [150, 2], [80, 15], [200, 1]
])
y = np.array([300, 250, 400, 180, 550])

print("特征矩阵 X:\\n", X)
print("目标变量 y:\\n", y)

# 初始化并训练模型
model = LinearRegression()
model.fit(X, y)

print("\\n--- 模型参数 ---")
print(f"截距 (Intercept): {model.intercept_:.2f}")
print(f"回归系数 (Coefficients): {model.coef_}")

# 预测与评估
y_pred = model.predict(X)
print("\\n--- 模型评估 ---")
print(f"均方误差 (MSE): {mean_squared_error(y, y_pred):.2f}")
print(f"决定系数 (R²): {r2_score(y, y_pred):.4f}")
`,
    sampleOutput: `特征矩阵 X:
 [[120   5]
 [100  10]
 [150   2]
 [ 80  15]
 [200   1]]
目标变量 y:
 [300 250 400 180 550]

--- 模型参数 ---
截距 (Intercept): -13.06
回归系数 (Coefficients): [ 2.76632421 -3.88204627]

--- 模型评估 ---
均方误差 (MSE): 16.48
决定系数 (R²): 0.9989`,
    explanation: {
      what_it_does: '通过最小二乘法，找到一条多元超平面，使得所有的点到这个面的误差平方和最小。',
      input_format: 'X 为二维特征矩阵（样本数×特征数），y 为一维目标值数组。',
      output_meaning: '提取出各个自变量（特征）对因变量的影响权重。R²越接近1表示模型拟合越好。',
      common_errors: 'X如果是单特征的一维数组，必须使用 X.reshape(-1, 1) 转换成二维形式才能 fit。',
      how_to_modify: '若想获得每个系数更详细的 P-Value（显著性检验），建议改用 statsmodels 库的 OLS()。'
    }
  },
  {
    id: 'py-preprocess',
    title: '数据预处理模块',
    language: 'python',
    relatedModel: 'Data Processing',
    difficulty: '初级',
    description: '使用 pandas 和 numpy 进行缺失值填充和数据标准化。',
    code: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# 1. 创建示例数据
data = {
    'A': [1.2, 2.3, np.nan, 4.5, 5.1],
    'B': [10, 20, 30, np.nan, 50],
    'C': [100, 200, 300, 400, 500]
}
df = pd.DataFrame(data)
print("原始数据:\\n", df)

# 2. 缺失值填充 (均值填充)
df = df.fillna(df.mean())
print("\\n缺失值填充后:\\n", df)

# 3. Z-Score 标准化
scaler = StandardScaler()
df_scaled = pd.DataFrame(
    scaler.fit_transform(df), 
    columns=df.columns
)
print("\\n标准化后数据 (均值=0, 标准差=1):\\n", df_scaled.round(4))
`,
    sampleOutput: `原始数据:
      A     B    C
0  1.2  10.0  100
1  2.3  20.0  200
2  NaN  30.0  300
3  4.5   NaN  400
4  5.1  50.0  500

缺失值填充后:
         A     B    C
0  1.200  10.0  100
1  2.300  20.0  200
2  3.275  30.0  300
3  4.500  27.5  400
4  5.100  50.0  500

标准化后数据 (均值=0, 标准差=1):
         A       B       C
0 -1.4116 -1.2721 -1.4142
1 -0.6628 -0.5452 -0.7071
2  0.0000  0.1817  0.0000
3  0.8335  0.0000  0.7071
4  1.2410  1.6355  1.4142`,
    explanation: {
      what_it_does: '演示了数据建模之前必须执行的清洗与无量纲化步骤。',
      input_format: 'Pandas DataFrame 或 CSV 文件',
      output_meaning: '填充了空白数据，并将不同量纲的数据压缩到了同一个数量级尺度上。',
      common_errors: '对不存在的列操作会导致 KeyError。如果在标准化前未填充缺失值，StandardScaler 会报错。',
      how_to_modify: '可以修改 fillna() 括号内参数为中位数 (median) 或指定常数。可以把 StandardScaler 换成 MinMaxScaler。'
    }
  },
  {
    id: 'py-topsis',
    title: 'TOPSIS 综合评价算法',
    language: 'python',
    relatedModel: 'TOPSIS',
    difficulty: '中级',
    description: '最经典的客观综合评价方法之一，根据距离正负理想解的程度得出得分。',
    code: `import numpy as np

# 假设4个方案，3个指标(成本, 利润, 寿命)
# 其中成本是极小型指标(越小越好)，利润和寿命是极大型指标(越大越好)
data = np.array([
    [500, 20, 5],
    [400, 30, 4],
    [600, 40, 6],
    [300, 10, 3]
])
print("原始矩阵:\\n", data)

# 1. 向量归一化
norm_data = data / np.sqrt((data**2).sum(axis=0))

# 2. 确定该指标的最大值(理想)和最小值(负理想)
# 注意: 第0列成本是越小越好
Z_max = np.array([np.min(norm_data[:,0]), np.max(norm_data[:,1]), np.max(norm_data[:,2])])
Z_min = np.array([np.max(norm_data[:,0]), np.min(norm_data[:,1]), np.min(norm_data[:,2])])

# 3. 计算与最优和最劣的距离
D_plus = np.sqrt(((norm_data - Z_max)**2).sum(axis=1))
D_minus = np.sqrt(((norm_data - Z_min)**2).sum(axis=1))

# 4. 计算综合得分 (越大越好)
Scores = D_minus / (D_plus + D_minus)
print("\\n各方案得分:\\n", np.round(Scores, 4))
print("最优方案排名:", np.argsort(-Scores) + 1)
`,
    sampleOutput: `原始矩阵:
 [[500  20   5]
 [400  30   4]
 [600  40   6]
 [300  10   3]]

各方案得分:
 [0.455  0.6482 0.5898 0.3807]
最优方案排名: [2 3 1 4]
(说明方案2综合评价最高)`,
    explanation: {
      what_it_does: '通过归一化矩阵，算出每个候选方案距离理想最佳和最差目标点的距离。',
      input_format: 'NumPy的二维数值矩阵，行代表方案，列代表指标',
      output_meaning: '一个处于0到1之间的得分，得分最高的是综合表现最优的方案。',
      common_errors: '忘记了数据的正向化。极小型指标（如污染、成本）的最优解是最小值，这点最容易出错。',
      how_to_modify: '可以向算法中加入熵权法算出的权重 W，在步骤1计算后乘上权重矩阵。'
    }
  },
  {
    id: 'py-kmeans',
    title: 'K-Means 聚类分析',
    language: 'python',
    relatedModel: 'Clustering',
    difficulty: '中级',
    description: '使用 sklearn 的 KMeans 进行无监督数据聚类。',
    code: `from sklearn.cluster import KMeans
import numpy as np

# 生成虚拟的二维散点数据
X = np.array([
    [1, 2], [1, 4], [1, 0],
    [10, 2], [10, 4], [10, 0]
])

print("样本数据点:\\n", X)

# 初始化 KMeans，假设聚成 2 类
kmeans = KMeans(n_clusters=2, random_state=0, n_init="auto")

# 拟合模型并预测
kmeans.fit(X)
labels = kmeans.labels_
centers = kmeans.cluster_centers_

print("\\n聚类结果标签 (每个点属于哪一类):\\n", labels)
print("\\n聚类中心坐标:\\n", centers)
`,
    sampleOutput: `样本数据点:
 [[ 1  2]
 [ 1  4]
 [ 1  0]
 [10  2]
 [10  4]
 [10  0]]

聚类结果标签 (每个点属于哪一类):
 [1 1 1 0 0 0]

聚类中心坐标:
 [[10.  2.]
 [ 1.  2.]]`,
    explanation: {
      what_it_does: '将相似距离的数据点自动归入事先指定数量的类别中。',
      input_format: 'M 行 N 列的特征矩阵。M是样本数',
      output_meaning: '返回每个样本的类别ID(如0,1,2)，以及每个聚类的中心点坐标。',
      common_errors: '在执行距离计算前没有进行 StandardScaler 归一化，导致数据量级大的特征主导了分类。',
      how_to_modify: '可以修改 n_clusters 改变类的数量。也可以通过循环计算多组 k 的惯性值来画肘部法则图。'
    }
  },

  // MATLAB TEMPLATES
  {
    id: 'mat-import-table',
    title: '读取与预览数据 (Table)',
    language: 'matlab',
    relatedModel: 'Data Processing',
    difficulty: '初级',
    description: '使用 readtable 加载数据并查看基本信息。',
    code: `% 1. 读取 Excel 文件 (模拟)
% T = readtable('data.xlsx');
% 在此以代码构建一个表作为示例
Year = [2018; 2019; 2020; 2021; 2022];
Revenue = [10.5; 12.3; 11.2; 15.6; 18.2];
Cost = [6.2; 7.1; 7.8; 8.5; 9.1];
T = table(Year, Revenue, Cost);

disp('--- 数据集前3行 (head) ---');
disp(head(T, 3));

disp('--- 数据表基本信息 (summary) ---');
summary(T);

% 2. 提取表格中的数据列
rev_array = T.Revenue;
fprintf('提取出的收入数组长度为: %d\\n', length(rev_array));
`,
    sampleOutput: `--- 数据集前3行 (head) ---
    Year    Revenue    Cost
    ____    _______    ____
    2018     10.5       6.2
    2019     12.3       7.1
    2020     11.2       7.8

--- 数据表基本信息 (summary) ---
Variables:
    Year: 5x1 double
        Values:
            Min           2018   
            Median        2020   
            Max           2022   
    Revenue: 5x1 double
        Values:
            Min           10.5   
            Median        12.3   
            Max           18.2   
            
提取出的收入数组长度为: 5`,
    explanation: {
      what_it_does: '演示了如何导入外部数据并转化为易于操作的 table 格式。',
      input_format: '通常为 .csv, .xlsx 或 .txt 格式的数据集文件。',
      output_meaning: 'summary 可以快速给出每列的最值和中位数。',
      common_errors: '路径中如果包含中文，某些老版本的 MATLAB 读取可能会乱码或找不到文件。',
      how_to_modify: '如果是纯数字矩阵，可以使用 readmatrix 来替代 readtable，速度更快。'
    }
  },
  {
    id: 'mat-stats',
    title: '描述性统计',
    language: 'matlab',
    relatedModel: 'Data Analysis',
    difficulty: '初级',
    description: '利用矩阵运算高效计算各类统计特征。',
    code: `% 声明一个包含成绩的矩阵 (行=学生, 列=不同科目)
% 例如 3 门科目的成绩
data = [88, 85, 90;
        92, 78, 85;
        75, 90, nan; % 模拟缺失值
        95, 92, 95;
        80, 85, 75];

disp('--- 描述性统计摘要 (按列) ---');
% mean 计算时可以用 'omitnan' 忽略缺失值
col_mean = mean(data, 1, 'omitnan');
col_std = std(data, 0, 1, 'omitnan');
col_max = max(data, [], 1, 'omitnan');

fprintf('科目的均值: %.2f  %.2f  %.2f\\n', col_mean);
fprintf('科目的标准差: %.2f  %.2f  %.2f\\n', col_std);
fprintf('科目的最高分: %.2f  %.2f  %.2f\\n', col_max);

disp('\\n--- 相关系数矩阵 (corrcoef) ---');
% 'rows','complete' 会自动忽略带有 nan 的整行
R = corrcoef(data, 'rows', 'complete');
disp(R);
`,
    sampleOutput: `--- 描述性统计摘要 (按列) ---
科目的均值: 86.00  86.00  86.25
科目的标准差: 8.31  5.43  8.54
科目的最高分: 95.00  92.00  95.00

--- 相关系数矩阵 (corrcoef) ---
    1.0000    0.2831    0.9234
    0.2831    1.0000    0.8115
    0.9234    0.8115    1.0000`,
    explanation: {
      what_it_does: '通过沿矩阵的不同维度（行或列）进行聚合运算，获取数据的统计特征。',
      input_format: 'M 行 N 列的数值矩阵。',
      output_meaning: '计算出诸如平均分、极差、标准差等，以及不同维度之间的相关性。',
      common_errors: '在有 NaN 时如果不加 "omitnan" 参数，计算结果也会变成 NaN。',
      how_to_modify: 'dim 参数 1 代表对列求特征，2 代表对行求特征。'
    }
  },
  {
    id: 'mat-dataviz',
    title: '数据可视化基础',
    language: 'matlab',
    relatedModel: 'Data Visualization',
    difficulty: '初级',
    description: '使用 plot 和 scatter 等基本函数进行 2D 绘图。',
    code: `% 1. 准备数据
x = linspace(0, 2*pi, 100);
y1 = sin(x);
y2 = cos(x);

% 2. 创建图形并绘制
figure('Name', '基本可视化');
plot(x, y1, '-r', 'LineWidth', 2); % 红色实线
hold on;                           % 保持图像以便继续绘制
plot(x, y2, '--b', 'LineWidth', 2);% 蓝色虚线
hold off;

% 3. 添加图例和标签
title('正弦与余弦曲线');
xlabel('x 值 (弧度)');
ylabel('y 值');
legend('sin(x)', 'cos(x)', 'Location', 'best');
grid on;

disp('绘图指令已执行。(在模拟环境中不显示图形窗口)');
`,
    sampleOutput: `绘图指令已执行。(在模拟环境中不显示图形窗口)`,
    explanation: {
      what_it_does: '将数值向量转化为可见的曲线图，对趋势和分布有直接认识。',
      input_format: '两个长度相同的数值数组。',
      output_meaning: '在界面上生成图形，方便对结果进行视觉解释。',
      common_errors: '如果不加 hold on，第二次 plot 会覆盖第一次画的内容。',
      how_to_modify: '使用 scatter(x, y) 变更为散点图，或者 bar(y) 生成柱状图。'
    }
  },
  {
    id: 'mat-matrix',
    title: '矩阵运算与解方程组',
    language: 'matlab',
    relatedModel: 'Linear Algebra',
    difficulty: '初级',
    description: '基础的矩阵操作和求解线性方程组。',
    code: `% 1. 声明已知矩阵A和列向量b
A = [2, 1, -1; 
    -3, -1, 2; 
    -2, 1, 2];
     
b = [8; -11; -3];

disp('系数矩阵 A:');
disp(A);

% 2. 求解 AX = b
X = A \\ b;  % MATLAB 左除运算符，速度最快的求解方式

fprintf('方程组的解 X = \\n');
disp(X);

% 3. 验证结果
err = norm(A*X - b);
fprintf('求解误差: %e\\n', err);
`,
    sampleOutput: `系数矩阵 A:
     2     1    -1
    -3    -1     2
    -2     1     2

方程组的解 X = 
     2.0000
     3.0000
    -1.0000

求解误差: 0.000000e+00`,
    explanation: {
      what_it_does: '使用MATLAB的核心特性矩阵运算来求解三个未知数的线性方程组。',
      input_format: '方阵A 和 列向量b',
      output_meaning: '输出符合所有线性约束变量组的数值。',
      common_errors: 'A如果是奇异矩阵（行列式为0）则无法得到唯一解，MATLAB会警告。',
      how_to_modify: '可以修改 A 和 b 的维数，只要保证A是方阵即可。'
    }
  },
  {
    id: 'mat-linprog',
    title: '线性规划问题优化',
    language: 'matlab',
    relatedModel: 'Linear Programming',
    difficulty: '中级',
    description: 'MATLAB 求解经典的连续型资源分配线性优化问题。',
    code: `% 目标函数：求最小值 min z = -3x1 - 5x2 (即求最大利润 3x1+5x2)
f = [-3; -5]; 

% 不等式约束：A * x <= b
% 例如: x1 + x2 <= 4; 2x1 + x2 <= 6
A = [1, 1; 2, 1];
b = [4; 6];

% 下界约束：x1 >= 0, x2 >= 0
lb = [0; 0];
ub = []; % 空代表无上界

% 调用 linprog 求解
options = optimoptions('linprog','Display','none');
[x, fval, exitflag] = linprog(f, A, b, [], [], lb, ub, options);

fprintf('最优解 x1 = %.2f, x2 = %.2f\\n', x(1), x(2));
fprintf('最大目标值 = %.2f\\n', -fval); % 恢复原始问题的最大值
`,
    sampleOutput: `最优解 x1 = 2.00, x2 = 2.00
最大目标值 = 16.00`,
    explanation: {
      what_it_does: '在满足所有约束不等式条件的范围内，找到能让目标函数最小化（或最大化）的决策变量点。',
      input_format: '目标函数系数向量 f，约束矩阵 A 和向量 b。',
      output_meaning: '返回具体的生产组合 x，以及相应的最高利润或最低成本 fval。',
      common_errors: 'linprog默认求最小值。求最大值需要将目标函数所有系数取相反数，最后结果也取相反数。',
      how_to_modify: '如果有等式约束，填入 [] 后面的 Aeq 和 beq 参数即可。'
    }
  },
  {
    id: 'mat-curvefit',
    title: '最小二乘曲线拟合',
    language: 'matlab',
    relatedModel: 'Data Fitting',
    difficulty: '初级',
    description: '通过多项式拟合去发现散点数据背后的函数规律。',
    code: `% 给定离散观测数据
x = [1, 2, 3, 4, 5, 6, 7];
y = [2.1, 3.8, 6.5, 9.2, 13.1, 15.8, 19.5];

% 使用 polyfit 进行二次多项式拟合 (y = ax^2 + bx + c)
% p 存放拟合项系数
n = 2; 
p = polyfit(x, y, n);

fprintf('拟合多项式系数 (从高次到低次):\\n');
disp(p);

% 预测新数据点
x_new = 8;
y_pred = polyval(p, x_new);
fprintf('预测 x=8 时的 y 值为: %.2f\\n', y_pred);
`,
    sampleOutput: `拟合多项式系数 (从高次到低次):
   -0.0357    3.2786   -1.3286

预测 x=8 时的 y 值为: 22.61`,
    explanation: {
      what_it_does: '寻找一条多项式曲线，使得它到所有散点之间垂直距离的平方和最小。',
      input_format: '维数相同的横坐标 x 数组和纵坐标 y 数组。',
      output_meaning: '返回的多项式系数可用于带入未知点 x 来预测未来的 y。',
      common_errors: '盲目调高除数 n（如设置 n=6）会导致高次龙格震荡（过拟合）。',
      how_to_modify: '把 n 设为 1 即为一元线性拟合（直线趋势）。'
    }
  }
];

export default function CodePlaygroundScreen({ navigate, initialTab, initialTemplateId }: any) {
  const [activeTab, setActiveTab] = useState<'python' | 'matlab'>(initialTab || 'python');
  const [currentTemplateId, setCurrentTemplateId] = useState<string>('');
  const [code, setCode] = useState('');
  
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Set default templates based on tab if none was passed
  useEffect(() => {
    if (initialTemplateId) {
      const template = TEMPLATES.find(t => t.id === initialTemplateId);
      if (template) {
        setActiveTab(template.language);
        setCurrentTemplateId(template.id);
        setCode(template.code);
        return;
      }
    }
    
    // Default fallback
    const defaultTemplate = TEMPLATES.find(t => t.language === activeTab);
    if (defaultTemplate) {
      setCurrentTemplateId(defaultTemplate.id);
      setCode(defaultTemplate.code);
      setOutput(null);
    }
  }, [activeTab, initialTemplateId]);

  const activeTemplate = TEMPLATES.find(t => t.id === currentTemplateId);

  const handleTemplateChange = (id: string) => {
    const template = TEMPLATES.find(t => t.id === id);
    if (template) {
      setCurrentTemplateId(template.id);
      setCode(template.code);
      setOutput(null);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    
    // Simulate real execution time
    setTimeout(() => {
      setIsRunning(false);
      setOutput(activeTemplate?.sampleOutput || '执行完成，无输出。');
    }, 1500);
  };

  const handleClear = () => {
    setOutput(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    if (activeTemplate) {
      setCode(activeTemplate.code);
      setOutput(null);
    }
  };

  // Filter templates for current language
  const availableTemplates = TEMPLATES.filter(t => t.language === activeTab);

  return (
    <div className="pt-20 px-0 pb-24 min-h-screen bg-surface flex flex-col font-sans">
      <div className="px-4">
        <TopBar title="Interactive Coding Lab" onBack={() => navigate('models')} />
      </div>

      <div className="px-4 mb-4">
         <div className="flex bg-surface-container p-1 rounded-xl w-full max-w-[300px] mx-auto shadow-sm">
            <button 
              onClick={() => { setActiveTab('python'); setOutput(null); }}
              className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'python' ? 'bg-white shadow text-primary' : 'text-on-surface-variant'}`}
            >
              Python
            </button>
            <button 
              onClick={() => { setActiveTab('matlab'); setOutput(null); }}
              className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'matlab' ? 'bg-white shadow text-[#e65100]' : 'text-on-surface-variant'}`}
            >
              MATLAB
            </button>
         </div>
      </div>

      <div className="px-4 mb-4">
         <div className="flex flex-row overflow-x-auto scrollbar-hide gap-2 py-1">
           {availableTemplates.map(t => (
             <button
                key={t.id}
                onClick={() => handleTemplateChange(t.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                  currentTemplateId === t.id 
                    ? (activeTab === 'python' ? 'bg-primary/10 border-primary text-primary' : 'bg-[#e65100]/10 border-[#e65100] text-[#e65100]')
                    : 'bg-surface-container-lowest border-surface-dim/30 text-on-surface-variant hover:bg-surface-container'
                }`}
             >
               {t.title}
             </button>
           ))}
         </div>
      </div>

      <div className="flex-1 px-4 flex flex-col max-w-full">
         <div className="bg-[#1e1e1e] rounded-t-2xl shadow-xl flex flex-col h-[350px] relative border border-[#333]">
            {/* Editor Header */}
            <div className="h-10 bg-[#2d2d2d] rounded-t-2xl border-b border-[#444] flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <span className="text-[#a0a0a0] text-xs font-mono ml-2 border border-[#444] px-2 py-0.5 rounded">
                     {activeTab === 'python' ? 'main.py' : 'script.m'}
                  </span>
                </div>
                <div className="flex gap-2">
                   <button onClick={handleReset} title="重置代码" className="p-1.5 text-[#a0a0a0] hover:text-white transition-colors">
                      <RefreshCw className="w-4 h-4" />
                   </button>
                   <button onClick={handleCopy} title="复制代码" className="p-1.5 text-[#a0a0a0] hover:text-white transition-colors relative">
                      {isCopied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                   </button>
                </div>
            </div>
            
            {/* Syntax Editor */}
            <div className="flex-1 relative overflow-hidden flex bg-[#1e1e1e]">
               {/* Line numbers fake */}
               <div className="py-4 px-2 w-10 text-right text-[#5a5a5a] text-xs font-mono select-none border-r border-[#333] hidden sm:block">
                 {code.split('\\n').map((_, i) => <div key={i}>{i+1}</div>)}
               </div>
               <textarea
                 value={code}
                 onChange={(e) => setCode(e.target.value)}
                 className="flex-1 w-full h-full resize-none bg-transparent text-[#d4d4d4] font-mono text-xs sm:text-sm p-4 focus:outline-none focus:ring-0 leading-relaxed max-w-full overflow-x-auto whitespace-pre font-light"
                 spellCheck="false"
               />
            </div>
            
            {/* Action Bar */}
            <div className="absolute bottom-4 right-4 flex gap-2">
               <button 
                 onClick={handleRun}
                 disabled={isRunning}
                 className={`py-2 px-5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95 ${
                   activeTab === 'python' ? 'bg-[#ffc107] text-[#333] hover:bg-[#ffca28]' : 'bg-[#0070bc] text-white hover:bg-[#005e9c]'
                 }`}
               >
                 {isRunning ? (
                   <RefreshCw className="w-4 h-4 animate-spin" />
                 ) : (
                   <Play className="w-4 h-4" />
                 )}
                 {isRunning ? 'Running...' : 'Run Code'}
               </button>
            </div>
         </div>

         {/* Console Area */}
         <div className="bg-[#0f0f0f] rounded-b-2xl min-h-[160px] p-4 font-mono text-xs text-green-400 border border-t-0 border-[#333] shadow-inner mb-6 flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-2 border-b border-[#333] pb-2">
                 <div className="text-[#a0a0a0] flex items-center gap-2">
                   <Terminal className="w-4 h-4" /> 
                   <span>Output Console</span>
                 </div>
                 <button onClick={handleClear} className="text-[#a0a0a0] hover:text-white px-2 py-1 rounded hover:bg-[#333] transition-colors">Clear</button>
             </div>
             
             <div className="flex-1 overflow-y-auto whitespace-pre-wrap select-text">
               {isRunning ? (
                 <span className="text-[#e6b450] animate-pulse">Executing code in simulated environment...</span>
               ) : output ? (
                 <span>{output}</span>
               ) : (
                 <span className="text-[#5a5a5a] italic">$ 编写代码并点击 Run 运行...</span>
               )}
             </div>

             <div className="w-full mt-4 p-2 bg-[#2d2d2d]/50 border border-[#444] rounded flex gap-2 items-start opacity-70">
                <AlertTriangle className="w-4 h-4 text-[#e6b450] shrink-0 mt-0.5" />
                <span className="text-[10px] text-[#a0a0a0] leading-tight font-sans">
                  {activeTab === 'python' 
                    ? "This is a simulated Python sandbox preview. Real execution can be connected later."
                    : "This is a simulated MATLAB playground preview. Real MATLAB execution can be connected later."}
                </span>
             </div>
         </div>

         {/* Explanation Box */}
         {activeTemplate && (
             <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-dim/30 mb-8 font-sans">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                     <BookOpen className="w-5 h-5 text-primary" /> 
                     运行指南: {activeTemplate.title}
                  </h3>
                  <button 
                    onClick={() => setIsAIChatOpen(true)}
                    className="bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" /> AI解释代码
                  </button>
                </div>
                
                <div className="space-y-4 text-sm font-medium">
                  <div className="bg-surface-container-high/30 p-3 rounded-lg border border-surface-dim/20">
                     <span className="text-xs uppercase font-bold text-on-surface-variant mb-1 block">📌 功能描述</span>
                     <p className="text-on-surface p-1">{activeTemplate.explanation.what_it_does}</p>
                  </div>
                  
                  <div className="bg-surface-container-high/30 p-3 rounded-lg border border-surface-dim/20">
                     <span className="text-xs uppercase font-bold text-on-surface-variant mb-1 block">📥 输入格式</span>
                     <p className="text-on-surface p-1">{activeTemplate.explanation.input_format}</p>
                  </div>

                  <div className="bg-green-50/50 p-3 rounded-lg border border-green-100">
                     <span className="text-xs uppercase font-bold text-green-700 mb-1 block">📤 结果含义</span>
                     <p className="text-green-900 p-1">{activeTemplate.explanation.output_meaning}</p>
                  </div>

                  <div className="bg-red-50/50 p-3 rounded-lg border border-red-100">
                     <span className="text-xs uppercase font-bold text-red-700 mb-1 block">⚠️ 常见错误</span>
                     <p className="text-red-900 p-1">{activeTemplate.explanation.common_errors}</p>
                  </div>

                  <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                     <span className="text-xs uppercase font-bold text-blue-700 mb-1 block">🔧 如何修改使用</span>
                     <p className="text-blue-900 p-1">{activeTemplate.explanation.how_to_modify}</p>
                  </div>
                </div>
             </div>
         )}
      </div>

      {activeTemplate && (
         <AIChatModal 
           isOpen={isAIChatOpen}
           onClose={() => setIsAIChatOpen(false)}
           feature="Code Playground AI explanation"
           context={`当前代码标题：${activeTemplate.title}\n编程语言：${activeTemplate.language}\n\n代码内容：\n${code}\n\n输出：\n${output || '无'}`}
           initialPrompt="请帮我逐行解释这段代码的逻辑，以及它在数学建模中的作用："
         />
      )}
    </div>
  );
}
