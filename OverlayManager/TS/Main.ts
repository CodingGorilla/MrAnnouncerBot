﻿function updateScreen() {
  const screenWidth: number = 1920;
  const screenHeight: number = 1080;

  myContext.clearRect(0, 0, screenWidth, screenHeight);
  var now = performance.now();
  myRocket.updatePosition(now);
  myRocket.bounce(0, 0, screenWidth, screenHeight, now);

  var coinsCollected: number = coins.collect(myRocket.x, myRocket.y, 310, 70);
  if (coinsCollected > 0) {
    new Audio(Folders.assets + 'Sound Effects/CollectCoin.wav').play();
    gravityGames.activeGame.score += coinsCollected;
  }


  redMeteors.bounce(0, 0, screenWidth, screenHeight, now);
  blueMeteors.bounce(0, 0, screenWidth, screenHeight, now);
  purpleMeteors.bounce(0, 0, screenWidth, screenHeight, now);

  //backgroundBanner.draw(myContext, 0, 0);

  if (!myRocket.isDocked)
    gravityGames.draw(myContext);

  coins.draw(myContext, now);
  redMeteors.draw(myContext, now);
  blueMeteors.draw(myContext, now);
  purpleMeteors.draw(myContext, now);
  myRocket.draw(myContext, now);
  redExplosions.draw(myContext, now);
  blueExplosions.draw(myContext, now);
  purpleExplosions.draw(myContext, now);
  //explosion.draw(myContext, 0, 0);
}

function handleKeyDown(evt) {
  const Key_C = 67;
  const Key_D = 68;
  const Key_M = 77;
  const Key_P = 80;
  const Key_Up = 38;
  const Key_Right = 39;
  const Key_Left = 37;
  const Key_Down = 40;

  var now = performance.now();
  evt = evt || window.event;
  if (evt.keyCode == 13) {
    if (!started || myRocket.isDocked) {
      started = true;
      myRocket.launch(now);
    }
    else if (myRocket.enginesRetracted)
      myRocket.extendEngines(now);
    else
      myRocket.retractEngines(now);
    return false;
  }
  else if (evt.keyCode == Key_Up) {
    myRocket.fireMainThrusters(now);
    return false;
  }
  else if (evt.keyCode == Key_Down) {
    myRocket.killHoverThrusters(now);
    return false;
  }
  else if (evt.keyCode == Key_Right) {
    myRocket.fireLeftThruster(now);
    return false;
  }
  else if (evt.keyCode == Key_Left) {
    myRocket.fireRightThruster(now);
    return false;
  }
  else if (evt.keyCode == Key_D) {
    myRocket.dock(now);
  }
  else if (evt.keyCode == Key_M) {
    myRocket.dropMeteor(now);
  }
  else if (evt.keyCode == Key_P) {
    gravityGames.cyclePlanet();
  }
  else if (evt.keyCode == Key_C) {
    if (myRocket.chuteDeployed)
      myRocket.retractChutes(now);
    else
      myRocket.deployChute(now);
    return false;
  }
}

function buildCenterRect(sprites) {
  sprites.fillRect(100, 100, myCanvas.clientWidth - 100, myCanvas.clientHeight - 100, 12);
}

function buildInnerRect(sprites) {
  sprites.fillRect(400, 200, myCanvas.clientWidth - 400, myCanvas.clientHeight - 200, 12);
}

function fillScreenRect(sprites) {
  sprites.fillRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight, 12);
}

function fillScreenRectMinusTwitchBanner(sprites) {
  sprites.fillRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight, 12);
  sprites.collect(100, 260, 1650, 240);
}

function outlineScreenRect(sprites) {
  sprites.outlineRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight, 11, rectangleDrawingSegment.bottom, 4);
}

function outlineMargin(sprites, margin) {
  sprites.outlineRect(2 * margin, margin, myCanvas.clientWidth - 2 * margin, myCanvas.clientHeight - margin, 12);
}

const coinMargin = 12;
function outlineGameSurface(sprites: Sprites) {
  sprites.layout(
    '*************************' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' + // 10
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*                       *' + '\n' +
    '*************************', coinMargin);
}

function fillChatRoom(sprites: Sprites) {
  sprites.layout(
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                  *******' + '\n' +
    '                  *******' + '\n' +
    '                  *******' + '\n' + // 10
    '                  *******' + '\n' +
    '                  *******' + '\n' +
    '                  *******' + '\n' +
    '                  *******', coinMargin);
}

function outlineChatRoom(sprites: Sprites) {
  sprites.layout(
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                         ' + '\n' +
    '                  *******' + '\n' +
    '                  *     *' + '\n' +
    '                  *     *' + '\n' + // 10
    '                  *     *' + '\n' +
    '                  *     *' + '\n' +
    '                  *     *' + '\n' +
    '                  *******', coinMargin);
}

function outlineCodeEditor(sprites: Sprites) {
  sprites.layout(
    '                         ' + '\n' +
    '******************       ' + '\n' +
    '*                *       ' + '\n' +
    '*                *       ' + '\n' +
    '*                *       ' + '\n' +
    '*                *       ' + '\n' +
    '*                *       ' + '\n' +
    '*                *       ' + '\n' +
    '*                *       ' + '\n' +
    '*                *       ' + '\n' + // 10
    '*                *       ' + '\n' +
    '*                *       ' + '\n' +
    '*                *       ' + '\n' +
    '***********     **       ', coinMargin);
}

function allButMark(sprites: Sprites) {
  sprites.layout(
    '                         ' + '\n' +
    '******************       ' + '\n' +
    '******************       ' + '\n' +
    '******************       ' + '\n' +
    '******************       ' + '\n' +
    '******************       ' + '\n' +
    '******************       ' + '\n' +
    '******************       ' + '\n' +
    '******************       ' + '\n' +
    '************* ****       ' + '\n' + // 10
    '************   ***       ' + '\n' +
    '************   ***       ' + '\n' +
    '************   ***       ' + '\n' +
    '***********     **       ', coinMargin);
}


function outlineBigRect(sprites) {
  outlineMargin(sprites, 100);
}

function outlineMediumRect(sprites) {
  outlineMargin(sprites, 200);
}

function outlineSmallRect(sprites) {
  outlineMargin(sprites, 300);
}



function addExplosion(meteors, x) {
  if (meteors === redMeteors)
    redExplosions.sprites.push(new SpriteProxy(0, x - redExplosions.spriteWidth / 2 + 50, 0));
  if (meteors === blueMeteors)
    blueExplosions.sprites.push(new SpriteProxy(0, x - blueExplosions.spriteWidth / 2 + 50, 0));
  if (meteors === purpleMeteors)
    purpleExplosions.sprites.push(new SpriteProxy(0, x - purpleExplosions.spriteWidth / 2 + 50, 0));
  new Audio(Folders.assets + 'Sound Effects/MeteorHit.wav').play();
}

var gravityGames = new GravityGames();

document.onkeydown = handleKeyDown;
var myCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
var coins = new Sprites("Spinning Coin/SpinningCoin", 165, 5, AnimationStyle.Loop, outlineChatRoom /* allButMark  */ /* outlineCodeEditor  */ /* fillChatRoom */);


var redMeteors = new Sprites("Spinning Rock/Red/Meteor", 63, 50, AnimationStyle.Loop);
redMeteors.moves = true;

var blueMeteors = new Sprites("Spinning Rock/Blue/Meteor", 63, 50, AnimationStyle.Loop);
blueMeteors.moves = true;

var purpleMeteors = new Sprites("Spinning Rock/Purple/Meteor", 63, 50, AnimationStyle.Loop);
purpleMeteors.moves = true;

var redExplosions = new Sprites("Explosion/Red/Explosion", 179, 5, AnimationStyle.Sequential);
var blueExplosions = new Sprites("Explosion/Blue/Explosion", 179, 5, AnimationStyle.Sequential);
var purpleExplosions = new Sprites("Explosion/Purple/Explosion", 179, 5, AnimationStyle.Sequential);
var backgroundBanner = new Part("CodeRushedBanner", 1, AnimationStyle.Static, 200, 300);
var myContext: CanvasRenderingContext2D = myCanvas.getContext("2d");
var myRocket = new Rocket(0, 0);
var started = false;
myRocket.x = 0;
myRocket.y = 0;
setInterval(updateScreen, 10);
gravityGames.selectPlanet('Earth');