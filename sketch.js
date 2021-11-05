
var ballon,backgroundSprite
var score = 0
var gameState = "play"
var heartTouch = false
var timer = 500

function preload(){
   
  backgroundImage = loadImage("images/background.jpg")
    obstacleImage = loadImage("images/fireimg.jpg")
  coinImage = loadImage("images/coin.png")
  ballonImage = loadImage("images/diamond.png")
  lifeImage = loadImage("images/heart.png")
  gameoverImage = loadImage("images/gameover1.jpg")
  ballonLifeImage = loadImage("images/diamondlife.png")
  ballonLifeEndImage = loadImage("images/diamondLifeEnd.png")
}




function setup() {
  createCanvas(windowWidth,windowHeight)

  backgroundSprite = createSprite(width/2,height/2,width,height)
  backgroundSprite.addImage(backgroundImage)
  backgroundSprite.velocityY = 4
  backgroundSprite.scale=2

  ballon = createSprite(width/2,height/2+200,10,10)
  ballon.addImage("ballon",ballonImage)
  ballon.addImage("ballonLife",ballonLifeImage)
  ballon.addImage("ballonLifeEnd",ballonLifeEndImage)
  ballon.scale = 0.2
  
  gameover = createSprite(width/2,height/2,10,10)
  gameover.addImage(gameoverImage)
  gameover.visible = false

  lb = createSprite(0,height/2,10,height)
  rb = createSprite(width,height/2,10,height)

  enemyGroup = createGroup()
  coinGroup = createGroup()
  heartsGroup = createGroup()

}

function draw() {
  background("black")

if (keyDown("left")){
  ballon.x = ballon.x-10
}

if (keyDown("right")){
  ballon.x = ballon.x+10

}

if(backgroundSprite.y>height-200){
  backgroundSprite.y = height/2
}
enemyGroup.bounceOff(lb)
enemyGroup.bounceOff(rb)
ballon.collide(lb)
ballon.collide(rb)

  ballon.overlap(coinGroup,function(collector,collected){
    collected.remove()
    score = score+1
  })

  if(enemyGroup.isTouching(ballon)  &&  heartTouch == false  ){
    gameState = "end"
    
  }
  if(heartsGroup.isTouching(ballon)){
     heartTouch = true
     ballon.changeImage("ballonLife")

     
  }
  if(heartTouch == true){
    timer = timer-1
  }
  if(timer<=0){
    heartTouch = false
    timer = 500
    ballon.changeImage("ballon")

  }
  if(timer<=100){
    ballon.changeImage("ballonLifeEnd")
  }
  if(gameState == "play"){
    coins()
    attackers()
    hearts()

  }
  if(gameState == "end"){
    gameover.visible = true
    backgroundSprite.velocityY = 0
    coinGroup.destroyEach()
    enemyGroup.destroyEach()
    heartsGroup.destroyEach()

  }

  drawSprites();
  textSize(30)
  fill("white")
  text("coins collected =  "+score,width-300,100)

}

function attackers(){
  if(frameCount%150 == 0){

    var enemy = createSprite(random(50,width-50),0,width/3,10)
  enemy.velocityY = 2
    enemy.velocityX = -5
    enemy.addImage(obstacleImage)
    enemyGroup.add(enemy) 

  }

}

function coins(){

    if(frameCount%200 == 0){
      var coins = createSprite(random(20,width-20),0,10,10)
      coins.velocityY = 2
      coins.addImage(coinImage)

      coinGroup.add(coins)

    }

}

function hearts(){
  if(frameCount%500 == 0){
   var heart = createSprite(random(20,width-20),0,20,20)
   heart.velocityY = 2
   heart.addImage(lifeImage)
    heartsGroup.add(heart)
    heart.scale = 0.2

  }
}
