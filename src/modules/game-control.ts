//游戏的控制器，控制着其他所有类
import Food from './food'
import ScorePanel from './score-panel'
import Snake from './snake'
/*  ArrowUp event.key
      ArrowDown event.key
      ArrowLeft event.key
      ArrowRight event.key
      (IE浏览器值： Up,Down,Left,Right)
 */
class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  //创建一个属性来存储蛇的移动方向
  direction: string = ''
  //常见一个变量定义游戏是否结束
  isLive: boolean = true
  constructor() {
    this.scorePanel = new ScorePanel()
    this.food = new Food()
    this.snake = new Snake()
    this.init()
    //调用run方法，使蛇移动
    this.run()
  }
  //游戏的初始化方法，调用后游戏开始~
  init() {
    //键盘上下左右键按下后，蛇可以移动,绑定键盘按下事件
    //当按下事件触发的时候，就会调用keyDownHandler  ，，，，但是此时this的指向，有问题，当事件执行的时候，this，不是 GameControl的实例，是document
    //所以需要修改this的指向,使用bind
    document.addEventListener('keydown', this.keyDownHandler.bind(this))
  }
  //创建键盘按下的响应函数
  keyDownHandler(event: KeyboardEvent) {
    //修改direction
    //赋值之前，需要检查event.key  是否合法
    //让蛇移动其实就是根据方向修改蛇头的位置，其实就是修改蛇的偏移量
    this.direction = event.key
    //不是按一下键盘，蛇动一下，所以不能再这边调用this.run
    // this.run()
  }
  //定义一个方法，用来检查蛇是否吃到了食物
  checkEat(X:number, Y:number) {
    //食物的坐标和舍得坐标一致，表示蛇吃到了食物
    if(X === this.food.X && Y === this.food.Y) {
      //吃到食物，食物的位置需要改变，分数增加，蛇变长
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
  //创建控制蛇移动的方法
  run() {
    //根据方向this.direction，来使蛇的位置改变
    /*
    向上：top 减少
    向下： top增加
    向左： left减少
    向右： left增加
     */
    //获取蛇现在的坐标
    let X = this.snake.X
    let Y = this.snake.Y

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break
      case 'ArrowRight':
      case 'Right':
        X += 10
        break
        //让蛇结束
      case "a": 
        this.isLive = false;
        break
    }
    this.checkEat(X,Y)
     //修改蛇的方向
    try {
      this.snake.X = X
      this.snake.Y = Y
    }catch(error:any) {
      //说明出现了异常
      alert(error?.message + 'Game Over')
      this.isLive = false;
    }

    //开启定时器,随着级别越来越高，时间越短
    const time =
      300 - (this.scorePanel.level - 1) * 30 > 0
        ? 300 - (this.scorePanel.level - 1) * 30
        : 10
    this.isLive && setTimeout(this.run.bind(this), time)
  }
}

export default GameControl
