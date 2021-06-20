var PLAY = 1;
var END  = 0;
var gameState = 1;



var road, roadImage;
var player,playerAnime,player_1;

var obstacle;
var obstacle1, obstacle2,obstacle3;

var opponent1,opponent2,opponent3;
var opponent1_img,opponent2_img,opponent3_img,opponent_1,opponent_2,opponent_3;

var ran;
var r;

  var gameOver, restart;



var opponent1group,opponent2group,opponent3group, obstacleGroup;

var score = 0;

function preload(){
  roadImage = loadImage("Road.png");
  playerAnime = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  opponent1_img = loadAnimation("opponent1.png","opponent2.png");
  opponent2_img = loadAnimation("opponent4.png","opponent5.png");
  opponent3_img = loadAnimation("opponent7.png","opponent8.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  opponent_1 = loadImage("opponent3.png");
  gameOverImg  = loadImage("gameOver.png");
  restartImg  = loadImage("restart.png");
  player_1 = loadImage("mainPlayer3.png"); 
  opponent_1  = loadImage("opponent3.png");
  opponent_2  = loadImage("opponent6.png");
  opponent_3  = loadImage("opponent9.png");
  bellsound = loadSound("bell.wav");
}

function setup(){
  createCanvas(800,400);
  road = createSprite(400,200,800,40);
  road.addImage("road", roadImage);
  //road.scale = 0.5;
  road.velocityX =-4;
  
  
  player = createSprite(50,200,10,10);
  player.addAnimation("cycling",playerAnime);
  player.addAnimation("over",player_1);
  player.scale =0.075;
  
  
  opponent1group = new Group();
  obstacleGroup = new Group();
  opponent2group = new Group();
  opponent3group = new Group();
  
  restart = createSprite(400,260,10,10);
  restart.addImage("restart",restartImg);
  restart.scale = 0.25;
  
  gameOver = createSprite(400,160,10,10);
  gameOver.addImage("gameover", gameOverImg);
  
  
  player.setCollider("rectangle",0,0,40,20,45);
  
  

}

function draw(){
  background(0);
 if (gameState==1){
   
   gameOver.visible = false;
   restart.visible = false;
   score= score+ Math.round(frameCount%2==0);
   
   road.velocityX = -(4+ 2*score/100);
   
   if (keyDown("space")){
     bellsound.play();
   }
   
   
   r = Math.round(random(1,4));
   if (road.x<150){
     road.x = road.width/2
   }
   
  player.y = World.mouseY;  
   if(World.frameCount%120==0){
    if (r==1){
      spawnOpponents1();
    }
     else if(r==2){
       spawnOpponents2();
     }
     else if(r==3){
       spawnOpponents3();
     }
     else{  spawnObstacles();
         }   
   }
   
  
  
      player.collide(opponent1group,changeAnime1);
      player.collide(opponent2group,changeAnime2);
      player.collide(opponent3group,changeAnime3);
  
if (opponent1group.isTouching(player)||opponent2group.isTouching(player)||
    opponent3group.isTouching(player)||obstacleGroup.isTouching(player)){
  
      gameState= 0;
   
 
 }
 }
  
  //gamestate change
if (gameState==0){
  player.destroy();
  opponent1group.destroyEach();
  opponent2group.destroyEach();
  obstacleGroup.destroyEach();
  opponent3group.destroyEach();
  restartGame();
        
  
}
  drawSprites();
  fill("white")
  textSize(20);
  textFont("monotype corsiva");
  text("Distance = "+score+" m",500,50);
  
  
}
function reset(){
gameState =1;
obstacleGroup.destroyEach();
opponent1group.destroyEach();
opponent2group.destroyEach();
opponent3group.destroyEach();
score = 0;
player.changeAnimation("cycling", playerAnime)
}

function spawnObstacles(){
  
  ran = Math.round(random(30,370));
  r = Math.round(random(1,3));
  obstacle = createSprite(800,ran,10,10);
  obstacle.velocityX= -4;
  obstacle.lifetime = 200;
  obstacle.scale = 0.1;
  if (r==1){
    obstacle.addImage("obstacle", obstacle1);
    
  }
  else if (r==2){
    obstacle.addImage("obstacle",obstacle2);
    
  }
  else { obstacle.addImage("obstacle",obstacle3);}
  
  
  obstacleGroup.add(obstacle);
}
function spawnOpponents1(){
   ran = Math.round(random(30,370));
   r = Math.round(random(1,3));
  opponent1 = createSprite(800,ran,10,10);
  opponent1.velocityX= -4;
  opponent1.lifetime = 200;
  opponent1.scale = 0.075;
  opponent1.addAnimation("opponent", opponent1_img);
  opponent1.addAnimation("opponent1", opponent_1);
  opponent1group.add(opponent1);
}

function spawnOpponents2(){
   ran = Math.round(random(30,370));
   r = Math.round(random(1,3));
  opponent2 = createSprite(800,ran,10,10);
  opponent2.velocityX= -4;
  opponent2.lifetime = 200;
  opponent2.scale = 0.075;
  opponent2.addAnimation("opponent_2", opponent2_img);                  opponent2.addAnimation("opponent2", opponent_2);
  opponent2group.add(opponent2);
}


function spawnOpponents3(){
   ran = Math.round(random(30,370));
   r = Math.round(random(1,3));
  opponent3 = createSprite(800,ran,10,10);
  opponent3.velocityX= -4;
  opponent3.lifetime = 200;
  opponent3.scale = 0.075;
  opponent3.addAnimation("opponent_3", opponent3_img);
  opponent3.addAnimation("opponent3", opponent_3);
  opponent3group.add(opponent3);
}
  
  



function changeAnime1(player,opponent1){
  opponent1.changeAnimation("opponent1", opponent_1);
  opponent1.setVelocityXEach = 0;
     gameState= 0;
   
  
}


function changeAnime2(player,opponent2){
  opponent2.changeAnimation("opponent2", opponent_2);
  opponent2.setVelocityXEach = 0;
     gameState= 0;
   
}


function changeAnime3(player,opponent3){
  opponent3.changeAnimation("opponent3", opponent_3);
  opponent3.setVelocityXEach = 0;
     gameState= 0;
   
}

function restartGame(){
  
var gameOverImg,restartImg;
  
  gameOver.visible = true;
  restart.visible  = true;
 
  
  gameOver.depth = restart.depth-1;
  player.velocityX = 0;
  road.velocityX = 0;
  
  
  player.changeAnimation("over",player_1);

    
    
  if(mousePressedOver(restart)){
      
    reset();
    
    
    }
}


