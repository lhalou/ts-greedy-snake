
// console.log("这是贪吃蛇项目")
//面向对象的形式编写功能
//写对象的前提，需要先定义类:对象：属性，方法
//蛇的坐标和 食物的坐标一一致，表示蛇吃到了食物
//食物的位置不是固定的，当蛇吃到了食物之后，食物的位置需要发生改变，并且位置是随机的w
class Food {
  //定义一个属性表示食物所对应的元素
  element: HTMLElement
  constructor() {
    //document.getElementById("food")  可能找不到对应的元素
    //！表示元素不会为空
    this.element = document.getElementById('food')!;
  }
  //获取食物巨鹿左上角的位置偏移量
  //定义获取食物X周坐标的方法
  get X() {
    return this.element.offsetLeft
  }
  //定义食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop
  }
  //修改食物位置的方法,并且位置是随机的
  //left的值 0 ~（300-10）
  //top的值0 ~（300-10）
  //且食物的坐标，必须是整10 的~，因为蛇移动一次，就是10   (一格)
  change() {
    const left = Math.round(Math.random() * 29) * 10
    const top = Math.round(Math.random() * 29) * 10
    this.element.style.left = `${left}px`
    this.element.style.top = `${top}px`
  }
}


export default Food
