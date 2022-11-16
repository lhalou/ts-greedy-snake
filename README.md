贪吃蛇 采用面向对象的思想进行变成，将游戏涉及的对象开发成单独的组件

### 食物food组件

食物： 
1. 食物的坐标： this.element.offsetLeft, this.element.offsetTop
2. 食物被蛇吃掉后任意改变位置: change

### 记分牌

分数：
1. 分数增加： this.score,this.addScore

等级

1. 分数达到一定程度，等级改变
2. 在分数改变的函数中，判断  10个分数一个等级，this.levelUp

### 蛇

1. 蛇的容器：this.element
2. 蛇头： this.head
3. 蛇的身体： this.bodies
4. 设置蛇的坐标，setX,setY,
    - 需要判断，蛇是否到达边界，到达则报错
    - 需要判断，蛇不能掉头
    - 需要判断蛇是否碰到自身身体（蛇头和身体有重叠的坐标）
5. 蛇吃到食物后，身体需要自增一节，this.addBody
6. 蛇的移动，需要先判断蛇尾，最后蛇头，即：第四季  移动到第三节的位置，第三节移动到第二节的位置，第二节移动到蛇头的位置this.moveBody
7. 蛇移动后，需要在设置蛇头的位置，蛇移动后，就要判断蛇是否碰到蛇身

### 主游戏对象

1. 蛇的移动：通过按下键盘来判断
2. 蛇是否吃到食物，即蛇头是否与食物的坐标重叠 
