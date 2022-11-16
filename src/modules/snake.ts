//蛇涉及很多业务逻辑
class Snake {
  //获取蛇的容器
  element: HTMLElement
  //表示蛇头的元素
  head: HTMLElement
  //获取蛇的身体,包括身体
  bodies: HTMLCollection
  constructor() {
    //document.getElementById("snake")实际是蛇的容器，并不是蛇，蛇是里面的div
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')!
  }
  //获取 蛇的坐标，其实就是舌头的坐标
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }
  //设置蛇坐标的方法
  set X(value: number) {
    if(this.X === value) return;
    //x的值的合法范围 0~290
    if(value < 0 || value > 290) {
      //蛇撞墙了，游戏结束，需要通知game-control  结束游戏
      throw new Error("蛇撞墙了")
    }
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value)  {
      if(value >  this.X) {
        value = this.X - 10
      }else {
        value = this.X + 10
      }
    }

    //移动身体
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
    //修改X，就是修改水平坐标，也就是蛇像左移动，那么蛇不能向右掉头
    //蛇头坐标和第二节身体坐标一样了，说明蛇发生了掉头，不允许蛇掉头
    //判断蛇头的X 坐标和第二节的X坐标是否一致,需要先判断是否有第二节身体

  }
  set Y(value: number) {
    if(this.Y === value) return;
    if(value < 0 || value > 290) {
      //蛇撞墙了，游戏结束，需要通知game-control  结束游戏
      throw new Error("蛇撞墙了")
    }
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value)  {
      if(value >  this.Y) {
        value = this.Y - 10
      }else {
        value = this.Y + 10
      }
    }
    //移动身体
    //要先移动身体，在改变位置，必须知道舍得最新长度，才能修改蛇的坐标
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHeadBody()

  }
  //蛇吃到食物之后，，身体需要增加一节
  addBody() {

    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
  //蛇的身体需要和蛇头一起移动，并且蛇不能碰到自身
  //添加一个蛇身体移动的方法
  moveBody() {
    //从蛇尾开始改，最后蛇头
    /*
    * 将后边的身体，设置为前面的身体的位置
    * 也就是说第四节身体 === 第三节身体的位置，
    * 第三节身体 === 第二节身体的位置
    * 第二节身体 === 蛇头的位置
    * */
    //遍历获取所有的身体，从后往前遍历
    //i> 0 才进入循环，i < 0  停止循环
    //蛇头位置与自身身体有重复，表示蛇撞到了身体，游戏over 。。。需要知道蛇头最新的坐标，舍得位置改完了，才知道蛇头最新坐标
    for(let i = this.bodies.length - 1; i > 0 ; i --   ) {
      //i < 0,因为蛇头的位置不需要改
      //获取前面身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      //将这个值设置到当前的身体上
      (this.bodies[i] as HTMLElement).style.left =  X + 'px';
      (this.bodies[i] as HTMLElement).style.top =  Y + 'px';
    }
  }
  //，检查是否与蛇头坐标重叠
  checkHeadBody() {
    //获取所有的身体
    for(let i = 1; i < this.bodies.length; i++) {
      if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
        //进入判断，说明蛇头撞到了身体
        throw new Error("蛇撞到了身体")
      }
    }
  }
}

export default Snake
