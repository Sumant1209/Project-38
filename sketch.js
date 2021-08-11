var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score, gameState, gameOver,gameOvera, restarta, restart;

var checkPoint, die, jump;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOvera = loadImage("gameOver.png");
  restarta = loadImage("restart.png");
  
  checkPoint = loadSound("checkPoint.mp3");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("collided", trex_collided);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameState = 1;
  
  gameOver = createSprite(1000, 75);
  gameOver.addImage("b", gameOvera);
  gameOver.scale = 0.6;
  
  restart = createSprite(1000, 150);
  restart.addImage("b", restarta);
  restart.scale = 0.6;
  
}

function draw() {
  background(180);
  
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
  
  if(gameState === 1){
    trex.changeAnimation("running", trex_running);
    ground.velocityX = -(6 + 3*score/100);
    spawnClouds();
    spawnObstacles();
    if(keyDown("space") && trex.y > 160) {
      trex.velocityY = -13;
      jump.play();
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = 0;
      die.play();
    }
    if(score%100 === 0 && score != 0){
      checkPoint.play();
    }
    
    
  }
  restartpressed();
  if(gameState === 0){
    trex.changeAnimation("collided", trex_collided);
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    
    score = 0;
    
    //gameOver.x = 300;
    //restart.x = 300;textSize(30);
    textSize(35);
    fill("majenta");
    text("Game has Ended", 200, 100)
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(6 + 3*score/100);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function restartpressed(){
  if(mousePressedOver(restart)){
    gameState = 1;
    
    gameOver.x = 1000;
    restart.x = 1000;
    
  }
  
  
  
}
