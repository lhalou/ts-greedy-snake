//定义记分牌的类, 分数，等级

class ScorePanel {
  //score 记录分数，level 记录等级，在构造函数中初始化
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement
  //设置一个变量，来限制等级
  maxLevel: number
  //设置H一个变量表示多少分升级
  upScore:number
  constructor(maxLevel: number = 10, upScore:number =10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore=upScore
  }
  //设置加分的方法
  addScore() {
    this.score++
    this.scoreEle.innerHTML = this.score + ''
    
    //通过分数判断，判断升级，
    if(this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  //提升等级的方法
  //满足一定的条件，就会升级
  levelUp() {
    //等级需要设置一个上线，控制蛇移动的速度
    if (this.level >= this.maxLevel) return
    this.levelEle.innerHTML = ++this.level + ''
  }
}

export default ScorePanel
