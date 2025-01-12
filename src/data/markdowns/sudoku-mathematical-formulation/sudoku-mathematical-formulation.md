---
title: "解数独与解方程？"
date: "2020-04-13T18:40:12+08:00"
lastmod: "2020-04-13T18:40:12+08:00"
draft: false
tags: ["sudoku","math"]
categories: ["数学应用"]
---

# 解数独与解方程？

## 抽象

大家最常见的那种数独游戏是给你一个9行9列的网格，里面有一些格子填上了数字，有一些没有，要你填入1到9的数字使每行每列甚至每对角线和每子区块没有重复的数字，对这种类型的简单的数独问题，我们尝试用数学方法来对其进行形式化，用数学的方式来讨论和研究数独问题.

![figure](figures/sudoku.png)

上面这张图片呢给出了一个数独问题，你按照一定的规则在空白格子处填入数字填完所有的空白格子，就算是通关了，开局给出的数字越多越容易，开局给出的数字越少越难因为有更多的数字要去．在本文中我们不讨论求解数独问题的诀窍，最后我们会写出一个定义在 \\( \\{0,1\\} \\) 上的线性方程组，通过求解这个方程组来求解这个数独问题.

## 决策变量

决定要在一个格子上填0到9范围的哪个数字算是做一个决策，为此我们设$x_{ijk}，x_{ijk} \in \\{0,1\\}$为决策变量，具体地，如果 \\( x_{ijk}=1 \\) 就表示第 \\( i \\) 行第 \\( j \\) 列的格子填入了数字 \\( k \\) ，否则如果 \\( x_{ijk}=0 \\) 就表示第 \\( i \\) 行第 \\( j \\) 列的格子没有填入数字 \\( k \\) ，稍后你会看到，我们按照这种方式设置决策变量，按照这种方式把「决策」用数学符号表示，是为了能够简明易懂地描述约束条件：行不重复列不重复块不重复斜线不重复等.

![figure](figures/sudoku-decision-variable.png)

以上图这个3乘3的微型数独为例，第一行填入了3，1，2，第二行填入了2，3，1，第三行填入了1，2，3，我们可以看成是每个小格子里有3个决策变量，或者看成是每个小格子里有3个「灯泡」💡，哪个灯泡💡点亮，那取值就是多少，比如说你看到第1行1列格子第3个决策变量涂了，那第1行1列格子就取3，第1行2列的第1个决策变量涂了，那第1行2列的格子就取1，以此类推到所有任意i行k列的格．然后我们就可以用决策变量的取值来描述这个数独的各个格子的数字了.

![figure](figures/sudoku-modeling.png)

以我们一开始展示的那个专家级别难度的数独问题为例，对于有数值的格子，例如上图画出来的那两个区块， \\( x_{157}=1 \\) 表示第1行第5列的格子取7， \\( x_{169}=1 \\) 表示第1行第6列的格子取9， \\( x_{917}=1 \\) 表示第9行第1列的格子取7， \\( x_{923}=1 \\) 表示第9行第2列的格子取3， \\( x_{838}=1 \\) 表示第8行第3列的格子取8. 另外你可以看到每个小格子里有9个决策变量，而这9个决策变量只有一个取1剩下的全取0，这是因为一个格子只能填入一个1到9的数字，而不能同时填入两个或多个数字.

## 约束条件

刚才我们提到了——一个小格子只能填入一个1到9的数字而不能填入两个或多个，这实际上就是一条最基本的约束条件，怎么描述它呢？其实很简单：

\begin{align*}
x_{ij1}+x_{ij2}+x_{ij3}+x_{ij4}+x_{ij5}+x_{ij6}+x_{ij7}+x_{ij8}+x_{ij9} = 1 \\\\
\forall{i,j} \in \\{1,2,3,4,5,6,7,8,9\\} \quad
x_{ijk} \in \\{0,1\\}
\end{align*}

有了这样一条约束，每一个小格子就只能填1个数字了——因为为了使式子成立 \\( x_{ij1},\cdots ,x_{ij9} \\) 之间只有一个能取1，也必须要有一个取1. 再结合决策变量的现实意义，就是每个小格子只能填入一个数字且必须填入一个数字.

上面的约束条件保证了在任意单个小格子内数字不漏不重，而一般的数独问题还要求行不重，列不重，块不重，甚至斜线也不重，该怎么用决策变量的方程组来表示这些约束呢？

首先来表示「行不重」这个约束条件，它具体是说：对任意一行，每一行当中，1到9这9个数字要全部用掉且每个数字只能用1次，刚好对应每一行都有9个格子，每行的9个格子就是这么填的，怎么形式化呢？以第一行为例，第一行只能有一个1，于是

\\[
x_{111}+x_{121}+x_{131}+x_{141}+x_{151}+x_{161}+x_{171}+x_{181}+x_{191} = 1
\\]

上边的这个方程中的每一项实际上是第一行的每一个小格子的第一个决策变量，这些决策变量中只有一个取1，也就是说第一行只能有1个小格子取1，例如说 \\( x_{141}=1 \\) 就表示第1行第4列的小格子取了1，那其他的 \\( x_{1j1},j=1,2,3,5,6,7,8,9 \\) 就不能取1了，也就说第一行的其他格子就不能再填入1了，这种约束条件是这样实现．写简洁一点，这个「第一行的每一个格子只能有一个填1」的约束条件可以写为

\\[
\sum_{j=1}^{9} x_{1j1} = 1
\\]

类似的，像是「第一行的每一个格子只能有一个填2」这样的约束条件可以表示为

\\[
\sum_{j=1}^{9} x_{1j2} = 1
\\]

推广到剩余的其他数字，是这样的

\\[
\sum_{j=1}^{9} x_{1jk} = 1, \quad k = 1,2,\cdots,9
\\]

再推广到每一行，是这样的：

\\[
\sum_{j=1}^{9} x_{ijk} = 1, \\\\
k = 1,2,\cdots,9, \quad i = 1,2, \cdots, 9
\\]

上面这个式子的意思是，对 \\( i=1,2,\cdots \\) 行，该行不能重复$k=1,2,\cdots,9．「行不得出现重复」的约束就这样表示出来了.

类似的，也可以很轻松很简洁地表述「列不得出现重复」这样的约束：

\\[
\sum_{i=1}^{9} x_{ijk} = 1, \\\\
k = 1,2, \cdots, 9, \quad j = 1,2, \cdots, 9
\\]

所谓「宫」就是整个9乘9的数独分成的9个3乘3的子数独，有9个宫，如下图所示

![figure](figures/sudoku-palaces.png)

现在要表示宫(1,1)中的9个格子只能分别填入1到9，即不得重复，这样的约束条件怎么表示呢？首先，数字1不得在宫中有重复，那么我们要把宫中9个对应数字1的决策变量加起来确保它们等于1：

\\[
x_{111}+x_{121}+x_{131}+ 
x_{211}+x_{221}+x_{231}+
x_{311}+x_{321}+x_{331}=1
\\]

类似地，在宫(1,1)中，1,2,...,9这9个数字也都是如此：

\\[
x_{11k}+x_{12k}+x_{13k}+ 
x_{21k}+x_{22k}+x_{23k}+
x_{31k}+x_{32k}+x_{33k}=1, \\\\
k = 1,2,\cdots, 9
\\]

类似地，对每个宫，我们先找数字1对应的决策变量，把这9个决策变量加起来，固定加起来得的和为1，再找数字2对应的9个决策变量，加起来，和固定为1，再找数字3对应的9个决策变量，加起来，和固定为1，以此类推到全部9个．所以，对于宫(1,2)，应有这样的约束条件

\\[
x_{14k}+x_{15k}+x_{16k}+
x_{24k}+x_{25k}+x_{26k}+
x_{34k}+x_{35k}+x_{36k} = 1, \\\\
k = 1,2,\cdots , 9
\\]

我们把余下7个宫的约束条件一并写出

\begin{align*}
x_{17k}+x_{18k}+x_{19k}+
x_{27k}+x_{28k}+x_{29k}+
x_{37k}+x_{38k}+x_{39k} = 1, \\\\
x_{41k}+x_{42k}+x_{43k}+
x_{51k}+x_{52k}+x_{53k}+
x_{61k}+x_{62k}+x_{63k} = 1, \\\\
x_{44k}+x_{45k}+x_{46k}+
x_{54k}+x_{55k}+x_{56k}+
x_{64k}+x_{65k}+x_{66k} = 1, \\\\
x_{47k}+x_{48k}+x_{49k}+
x_{57k}+x_{58k}+x_{59k}+
x_{67k}+x_{68k}+x_{69k} = 1, \\\\
x_{71k}+x_{72k}+x_{73k}+
x_{81k}+x_{82k}+x_{83k}+
x_{91k}+x_{92k}+x_{93k} = 1, \\\\
x_{74k}+x_{75k}+x_{76k}+
x_{84k}+x_{85k}+x_{86k}+
x_{94k}+x_{95k}+x_{96k} = 1, \\\\
x_{77k}+x_{78k}+x_{79k}+
x_{87k}+x_{88k}+x_{89k}+
x_{97k}+x_{98k}+x_{99k} = 1, \\\\
k=1,2,\cdots, 9 .
\end{align*}

这样就表示了行约束列约束和宫约束，斜线约束游戏中并没有提到，所以我们就不在列出了，如果要列出的话也不难，找到每一条45度或135度的斜线，对每个数字找出对应的决策变量，相加，固定和为1，这样即可表示斜线的约束.

## 方程汇总

我们把上面零散的方程片段汇总到这里：

\\[
\sum_{k=1}^{9} x_{ijk} = 1, \\\\
i = 1,2,\cdots, 9, \quad j = 1,2,\cdots, 9
\\]

\\[
\sum_{j=1}^{9} x_{ijk} = 1, \\\\
k = 1,2,\cdots,9, \quad i = 1,2, \cdots, 9
\\]

\\[
\sum_{i=1}^{9} x_{ijk} = 1, \\\\
k = 1,2, \cdots, 9, \quad j = 1,2, \cdots, 9
\\]

\begin{align*}
\sum_{i=1}^{3} \sum_{j=1}^{3} x_{ijk} = 1 \\\\
\sum_{i=1}^{3} \sum_{j=4}^{6} x_{ijk} = 1 \\\\
\sum_{i=1}^{3} \sum_{j=7}^{9} x_{ijk} = 1 \\\\
\sum_{i=4}^{6} \sum_{j=1}^{3} x_{ijk} = 1 \\\\
\sum_{i=4}^{6} \sum_{j=4}^{6} x_{ijk} = 1 \\\\
\sum_{i=4}^{6} \sum_{j=7}^{9} x_{ijk} = 1 \\\\
\sum_{i=7}^{9} \sum_{j=1}^{3} x_{ijk} = 1 \\\\
\sum_{i=7}^{9} \sum_{j=4}^{6} x_{ijk} = 1 \\\\
\sum_{i=7}^{9} \sum_{j=7}^{9} x_{ijk} = 1 \\\\
k=1,2,\cdots, 9 . 
\end{align*}

其中

\\[
x_{ijk} \in \\{0,1 \\}, \\\\
\forall{i,j,k} \in \\{1,2,3,4,5,6,7,8,9 \\}
\\]

上面的方程的所有的解对应所有的有行约束列约束和宫约束的数独的．

## 通过求解数学方程组来求解数独

事实上已经有专门的数独求解算法而非通过求解方程来求解数独，但是为了验证我们对数独问题建立的数学模型的正确性，我们还是打算通过求解这个方程组来求解一个数独问题.

首先呢，我们选择用`Wolfram Mathematica`来处理这个方程，`Mathematica`呢它有强大的符号处理能力，解方程之类的，不在话下，但是我们不打算直接用`Mathematica`来解方程，我们是打算呢，用`Mathematica`把这个线性方程组啊转化成这么一个矩阵的形式，什么意思呢？例如说有下面这样一个线性方程组

\\[
\begin{cases}
x + 2y + z = 1 \\\\
2x + y + 3z = 3
\end{cases}
\\]

回想起我们大一学过的线性代数（也叫高等代数）的知识，根据矩阵的乘法运算法则，我们呢，可以把上面这个线性方程组写成这样一个等价的形式：

\\[
\begin{bmatrix}
1 & 2 & 1 \\\\
2 & 1 & 3 
\end{bmatrix} 
\begin{bmatrix}
x \\\\
y \\\\
z 
\end{bmatrix} = \begin{bmatrix}
1 \\\\
3
\end{bmatrix}
\\]

类似的道理，我们上面列出的那一堆式子组成的方程组呢，其实也是左边是 \\( x_{ijk} \\) 的线性组合，而右边全是1，我们想把上面那堆方程组写成

\\[
A x = 1_{324 \times 1}
\\]

其中的 \\( x \\) 其实是一个列向量，它包含了全部 \\( 9\times 9 \times 9=729 \\) 个变量，而 \\( A \\) 是线性方程组的系数矩阵，因为前面那堆方程组总共有324个式子，所有这个系数矩阵 \\( A \\) 它是324行（方程组的个数）729列（变量的个数）的，而等式右边是一个324行的全1矩．但是注意到，这个数独已经给出了一些提示，也就是一些已知信息，例如第一行第二列的格子等于5，也就是 \\( x_{125}=1 \\) ，还有更多的这类信息，那么输入的信息实际上可用表示为

\\[
B x = 1_{23 \times 1}
\\]

其中 \\( B \\) 照样是729列的，也就是 \\( B \\) 这个矩阵的每一行它有729个数，要么取1要么取0，取1的就对应 \\( x_{ijk}=1 \\) 的系数1， \\( B \\) 有23行，是因为总共有23个已知数．写起来，我们将要求解这么样的一个方程组

\\[
\begin{bmatrix}
A \\\\
B
\end{bmatrix} x = 1_{327 \times 1}
\\]

而我们使用`Mathematica`，于求解原来的数独问题的意义，就是将前面列出来的

\\[
\sum x_{ijk} = 1
\\]

这种形式的方程组转换为

\\[
A x = 1
\\]

这种矩阵形式表示的方程组.

首先要表示的是

\\[
\sum_{k=1}^{9} x_{ijk} = 1, \\\\
i = 1,2,\cdots, 9, \quad j = 1,2,\cdots, 9
\\]

它对应`Mathematica`代码

```
mat1 = Coefficient[#, variables] & /@ Flatten[Table[
     Sum[x[i][j][k], {k, 1, 9}], {i, 1, 9}, {j, 1, 9}
]];
```

然后是

\\[
\sum_{j=1}^{9} x_{ijk} = 1, \\\\
k = 1,2,\cdots,9, \quad i = 1,2, \cdots, 9
\\]

对应的`Mathematica`代码是

```
mat2 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[x[i][j][k], {j, 1, 9}], 
    {k, 1, 9}, {i, 1, 9}
]];
```

再然后是

\\[
\sum_{i=1}^{9} x_{ijk} = 1, \\\\
k = 1,2, \cdots, 9, \quad j = 1,2, \cdots, 9
\\]

同样转化为`Mathematica`代码

```
mat3 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[x[i][j][k], {i, 1, 9}], {k, 1, 9}, {j, 1, 9}
]];
```

下面是每个宫的9个约束：

\begin{align*}
\sum_{i=1}^{3} \sum_{j=1}^{3} x_{ijk} = 1 \\\\
\sum_{i=1}^{3} \sum_{j=4}^{6} x_{ijk} = 1 \\\\
\sum_{i=1}^{3} \sum_{j=7}^{9} x_{ijk} = 1 \\\\
\sum_{i=4}^{6} \sum_{j=1}^{3} x_{ijk} = 1 \\\\
\sum_{i=4}^{6} \sum_{j=4}^{6} x_{ijk} = 1 \\\\
\sum_{i=4}^{6} \sum_{j=7}^{9} x_{ijk} = 1 \\\\
\sum_{i=7}^{9} \sum_{j=1}^{3} x_{ijk} = 1 \\\\
\sum_{i=7}^{9} \sum_{j=4}^{6} x_{ijk} = 1 \\\\
\sum_{i=7}^{9} \sum_{j=7}^{9} x_{ijk} = 1 \\\\
k=1,2,\cdots, 9 . 
\end{align*}

转化为`Mathematica`代码就是：

```
mat4 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 1, 3}], {i, 1, 3}], 
    {k, 1, 9}
]];

mat5 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 4, 6}], {i, 1, 3}], 
    {k, 1, 9}
]];

mat6 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 7, 9}], {i, 1, 3}], 
    {k, 1, 9}
]];

mat7 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 1, 3}], {i, 4, 6}], 
    {k, 1, 9}
]];

mat8 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 4, 6}], {i, 4, 6}], 
    {k, 1, 9}
]];

mat9 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 7, 9}], {i, 4, 6}], 
    {k, 1, 9}
]];

mat10 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 1, 3}], {i, 7, 9}], 
    {k, 1, 9}
]];

mat11 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 4, 6}], {i, 7, 9}], 
    {k, 1, 9}
]];

mat12 = Coefficient[#, variables] & /@ Flatten[Table[
    Sum[Sum[x[i][j][k], {j, 7, 9}], {i, 7, 9}], 
    {k, 1, 9}
]];
```

以及还有已知信息：

```
inputSudoku = {
   {0, 5, 0, 0, 7, 9, 0, 0, 0},
   {0, 0, 0, 0, 0, 0, 5, 0, 0},
   {0, 9, 2, 0, 0, 0, 0, 6, 0},
   {0, 8, 0, 0, 0, 0, 4, 0, 7},
   {0, 2, 0, 6, 0, 0, 0, 1, 0},
   {0, 7, 0, 2, 5, 0, 0, 8, 0},
   {0, 0, 0, 0, 4, 0, 0, 0, 0},
   {0, 0, 8, 0, 2, 0, 0, 0, 0},
   {7, 3, 0, 0, 0, 1, 0, 0, 0}
};

inputValues = Flatten[Table[
    If[inputSudoku[[i]][[j]] == k, x[i][j][k], Nothing],
    {i, 1, 9}, {j, 1, 9}, {k, 1, 9}
]];

mati = Coefficient[#, variables] & /@ inputValues;
```

我们把上面所有小矩阵合并成一个大矩阵

```
matn = Join[
   mat1,
   mat2,
   mat3,
   mat4,
   mat5,
   mat6,
   mat7,
   mat8,
   mat9,
   mat10,
   mat11,
   mat12,
   mati
];
```

这时如果我们查看总系数矩阵`matn`的维数

```
Dimensions[matn]
```

会发现是

```
{347, 729}
```

维的.

接下来我们把这个总系数矩阵导出为`.csv`后缀名的CSV文件，供MATLAB求解，因为我不知道怎么用`Mathematica`快速高效地求解二元整数变量组成的方程组：

```
Export["~/Desktop/matn.csv", matn]
```

现在`matn.csv`这个文件就包含了足够清楚地描述这个9乘9数独问题的全部信息，`matn.csv`就是那个系数矩阵，我们把它导入到MATLAB中并求解，下面是MATLAB求解数独问题的代码

```
clear
matData = readtable("~/Desktop/matn.csv");
aeq = matData{:, :};
beq = ones([347, 1]);
intcon = 1:729;
c = zeros([1, 729]);
lb = zeros([729, 1]);
ub = ones([729, 1]);
sol = intlinprog(c, intcon, [], [], aeq, beq, lb, ub);
deciders = reshape(sol, 9, 9, 9);
for i = 1:9
    for j = 1:9
        temp = deciders(i, j, :);
        sudoku(i, j) = [1:9]*temp(:);
    end
end
sudoku
writetable( ...
    table(sudoku), ...
    "~/Desktop/sudoku.csv", ...
    "WriteVariableNames", false ...
);
```

看一下输出结果也无妨：

![figure](figures/matlab-solved-soduku.png)

可以很容易地验证，这个解的每一行当中没有重复的数字，每一列当中没有重复的数字，每一个宫中也没有重复的数字.

## 额外的讨论

我们算出的系数矩阵是347行729列的，也就是说至少有 \\( 729-347=382 \\) 个自由变量，因为该系数矩阵的秩最多会是347，解空间实际上至少是个382维的空间，而要在这个382维的空间寻找一个729维的坐标，或者729个元素的向量，这个坐标（向量）的每个分量都只能是0或1，就是依方程组方法求解数独问题的几何解．而在这个347维的空间包含了多少个这样的729元的向量，那么这个数独问题就有多少个解.

## 总结

我们先用线性方程组，对一类简单的数独问题进行了建模，准确的说是用 \\( \\{0,1 \\} \\) 二元变量来表示最基本的决策单元，然后我们又用`Mathematica`将列出的方程组转化为系数矩阵，然后我们用MATLAB在 \\( \\{0,1 \\} \\) 的定义域内求解这个系数矩阵所表示的方程组，这样就完成了这类简单数独问题的求解.
