var background;
var rocket;
var coin;
var edges;
var coinGroup;
var score=0;
var obstacles;
var obstaclesGroup;
var scoreII=70
var coinSound;
var bomb;
var gameover;




function preload(){
    backgroundImg=loadImage("assets/space.png");
    rocketImg=loadImage("assets/rocket.png");
    coinImg=loadImage("assets/coin.png");
    obstaclesImg=loadImage("assets/obstacles.png");
    coinSound=loadSound("assets/coin.mp3");
    bomb=loadSound("assets/bomb.mp32");
    gameoverImg = loadImage("assets/gameover.png");

}

function setup() {
    createCanvas(500,800);
    background=createSprite(200,200);
    background.addImage(backgroundImg);
    background.velocityY=3;

    rocket=createSprite(200,400);
    rocket.addImage(rocketImg);
    rocket.scale=0.2;

    gameover=createSprite(200,200);
    gameover.addImage(gameoverImg);
    gameover.scale=0.4;
    gameover.visible=false;

    

   

    coinGroup=createGroup();
    obstaclesGroup=createGroup();
 
}

function draw() {
    drawSprites();
    
    textSize(30)
    fill("yellow")
    text("score: "+score,40,50);
   

    
    edges=createEdgeSprites();
    rocket.collide(edges)
    if(keyDown("right")){
        rocket.x=rocket.x+10;
    }
    if(keyDown("left")){
        rocket.x=rocket.x-10;
    }
    if(background.y>height){
        background.y=height/2;
    }

    if(World.frameCount%200===0){
        coin=createSprite(200,200);
        coin.addImage(coinImg);
        coin.velocityY=20;
        coin.scale=0.1;
        coin.x=Math.round(random(200,400,990,100));

        coinGroup.add(coin);

       
 
    }
    if(World.frameCount%300===0){
        obstacles=createSprite(20,20);
        obstacles.addImage(obstaclesImg);
        obstacles.scale=0.1;
        obstacles.velocityY=20;
        obstacles.x=Math.round(random(300,20,1000,700));

        obstaclesGroup.add(obstacles);
    }
    if(coinGroup.isTouching(rocket)){
        score=score+1
        coinSound.play()
    
    }
    if(obstaclesGroup.isTouching(rocket)){
        bomb.play();
        rocket.destroy();
        coinGroup.destroyEach();
        coin.velocityY=0;
        obstaclesGroup.destroyEach();
        gameover.visible=true;
        background.velocityY=0;
    }
    
     
     
}