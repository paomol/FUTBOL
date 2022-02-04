var paddleX=0;
var paddleX2=0;
var paddleY2=0;
var y=0;
var paddleY=0;
let frame;
let context;
function Audio_Disp(){
  
  //Estructura para habilitar el micrófono
  //True=El usuario dio permisos
  let audioIN = { audio: true };
  navigator.mediaDevices.getUserMedia(audioIN).then(function (mediaStreamObj) {
  //Then retorna una promesa, sí
  //El dispositivo esta conectado
  //Seleccione la vía por la cual obtendra el audio
      let audio = document.querySelector('audio');
      //Cree un objeto para almacenar lo que llega del micrófono
      if ("srcObject" in audio) {audio.srcObject = mediaStreamObj;}
      else{audio.src = window.URL.createObjectURL(mediaStreamObj);}
      //Reproducir audio precargado 
      audio.onloadedmetadata = function (ev){audio.play();};
      //Iniciar grabación
      let start = document.getElementById('btnStart');
      //Parar grabación
      let stop = document.getElementById('btnStop');
      //Elemento para reproducir el audio
      window.playAudio = document.getElementById('adioPlay');
      //API de reproducción
      let mediaRecorder = new MediaRecorder(mediaStreamObj);
      //Oyente para el botón start
      start.addEventListener('click', function (ev) {
        mediaRecorder.start();
      })
      //Oyente para el botón stop
      stop.addEventListener('click', function (ev) {
        mediaRecorder.stop();
      });
      // Si hay audio disponible reproduzca
      mediaRecorder.ondataavailable = function (ev) {
        //dataArray.push(ev.data);
        dataArray.push(ev.data);
      }
      // Matriz de fragmentos para almacenar audio
      let dataArray = [];
      // Unifique los datos de audio
      // Despues de para la reproducción 
      mediaRecorder.onstop = function (ev) {
        // Guardar mp3
        let audioData = new Blob(dataArray, 
                  { 'type': 'audio/mp3;' });
        // Vaciar arreglo
        dataArray = [];
        // Crear URL para reproducir el audio
        let audioSrc = window.URL.createObjectURL(audioData);
        playAudio.src = audioSrc;
      }
    })
    // Si hay algún error entonces haga esto
    .catch(function (err) {
      console.log(err.name, err.message);
  });
  //Tomar los elementos creados en la interface y almacenarlos en variables
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const snap = document.getElementById('snap');
  const errorMsgElement = document.querySelector('span#errorMsg');
  //Asignar dimensionalidad al área de video
  const constraints = {
  audio: false,
  video: {width: 150, height: 90}
  };
  // Solicitar permiso para acceder a la WEBCAM
  async function init() {
  try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
  } catch (e) {
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
  }
  // Si la función retorna que es permitido inicie la proyección en la página
  function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
  }
  // Cargar al inicio
  init();
  // Dibujar imágen usando un oyente asignado al botón
  let context = canvas.getContext('2d');
  
  snap.addEventListener("click", function() {
      context.drawImage(video, 0, 0, 630 , 360);
      frame=document.createElement('a');
      frame.download="fondo.jpg";
      frame.href=canvas.toDataURL();
      frame.click();
      setTimeout(draw, 1000);
  });


var ballRadius = 10;
var x = canvas.width/2;
y = canvas.height/2;
var dx = -0.5;
var dy = 0.5;
var paddleHeight = 20;
var paddleWidth =40;
paddleX = (canvas.width-paddleWidth)/2;
paddleY = ((canvas.height-paddleWidth)/2)+30;
paddleX2 = (canvas.width-paddleWidth)/2;
paddleY2 = ((canvas.height-paddleWidth)/2)-30;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var wPressed = false;
var sPressed = false;
var aPressed = false;
var dPressed = false;
var brickRowCount = 1;
var brickColumnCount = 1;
var brickWidth = 10;
var brickHeight = 80;
var brickPadding = canvas.width-30;
var brickOffsetTop = (canvas.height/2-40);
var brickOffsetLeft = 5;

var brickRowCount2 = 1;
var brickColumnCount2 = 1;
var brickWidth2 = 10;
var brickHeight2 = 80;
var brickPadding2 = 5;
var brickOffsetTop2 = (canvas.height/2-40);
var brickOffsetLeft2 = canvas.width-15;
var score = 0;
var score2 = 0;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 3 };
    }
}

var bricks2 = [];
for(c=0; c<brickColumnCount2; c++) {
    bricks2[c] = [];
    for(r=0; r<brickRowCount2; r++) {
        bricks2[c][r] = { x: 0, y: 0, status2: 3 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = true;
  }
  else if(e.keyCode == 37) {
      leftPressed = true;
  }
  else if(e.keyCode == 38) {
      upPressed = true;
  }
  else if(e.keyCode == 40) {
      downPressed = true;
  }
  else if(e.keyCode == 87) {
      wPressed = true;
  }
  else if(e.keyCode == 83) {
      sPressed = true;
  }
  else if(e.keyCode == 65) {
      aPressed = true;
  }
  else if(e.keyCode == 68) {
      dPressed = true;
  }
}

//Funciones con botones
function keyUpHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = false;
  }
  else if(e.keyCode == 37) {
      leftPressed = false;
  }
  else if(e.keyCode == 38) {
      upPressed = false;
  }
  else if(e.keyCode == 40) {
      downPressed = false;
  }
  else if(e.keyCode == 87) {
      wPressed = false;
  }
  else if(e.keyCode == 83) {
      sPressed = false;
  }
  else if(e.keyCode == 65) {
      aPressed = false;
  }
  else if(e.keyCode == 68) {
      dPressed = false;
  }
}
//---Detectar colisión
function collisionDetection() {
  for(c=0; c<brickColumnCount; c++) {
      for(r=0; r<brickRowCount; r++) {
          var b = bricks[c][r];
          if(b.status >=1) {
              if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                  dy = -dy;
                  b.status--;
                  score++;
                  if(score == 3) {
                    playAudio.play();
                    setTimeout(alert("¡GANA COLOMBIA!"),100);
                      document.location.reload();
                  }
                  else{
                      x = canvas.width/2;
                      y = canvas.height/2;
                      paddleX = (canvas.width-paddleWidth)/2;
                      paddleY = ((canvas.height-paddleWidth)/2)+30;
                      paddleX2 = (canvas.width-paddleWidth)/2;
                      paddleY2 = ((canvas.height-paddleWidth)/2)-30;
                      playAudio.play();
                      setTimeout(alert("¡GOL DE COLOMBIA!"), 100);
                  }
              }
          }
      }
  }
}

function collisionDetection2() {
  for(c=0; c<brickColumnCount2; c++) {
      for(r=0; r<brickRowCount2; r++) {
          var b = bricks2[c][r];
          if(b.status2 >=1) {
              if(x > b.x && x < b.x+brickWidth2 && y > b.y && y < b.y+brickHeight2) {
                  dy = -dy;
                  b.status2--;
                  score2++;
                  if(score2 == 3) {
                    playAudio.play();
                    setTimeout(alert("¡GANA BRASIL!"),100);
                      document.location.reload();
                  }
                  else{
                      x = canvas.width/2;
                      y = canvas.height/2;
                      paddleX = (canvas.width-paddleWidth)/2;
                      paddleY = ((canvas.height-paddleWidth)/2)+30;
                      paddleX2 = (canvas.width-paddleWidth)/2;
                      paddleY2 = ((canvas.height-paddleWidth)/2)-30;
                      playAudio.play();
                      setTimeout(alert("¡GOL DE BRASIL!"), 100);
                      
                  }
              }
          }
      }
  }
}


function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI*2);
  context.fillStyle = "#000000";
  context.fill();
  context.closePath();
}

function drawPaddle() {
  context.beginPath();
  context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  context.fillStyle = "#fcf403";
  context.fill();
  context.closePath();
}

function drawPaddle2() {
  
  context.beginPath();
  context.rect(paddleX2, paddleY2, paddleWidth, paddleHeight);
  context.fillStyle = "#17ab03";
  context.fill();
  context.closePath();
}

function drawBricks() {
  for(c=0; c<brickColumnCount; c++) {
      for(r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status >=1) {
              var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
              var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              context.beginPath();
              context.rect(brickX, brickY, brickWidth, brickHeight);
              context.fillStyle = "#17ab03";
              context.fill();
              context.closePath();
          }
      }
  }
}

function drawBricks2() {
  for(c=0; c<brickColumnCount2; c++) {
      for(r=0; r<brickRowCount2; r++) {
          if(bricks2[c][r].status2 >=1) {
              var brickX2 = (r*(brickWidth2+brickPadding2))+brickOffsetLeft2;
              var brickY2 = (c*(brickHeight+brickPadding2))+brickOffsetTop2;
              bricks2[c][r].x = brickX2;
              bricks2[c][r].y = brickY2;
              context.clearRect( video, 0, 0, canvas.width, canvas.height);
              context.beginPath();
              context.rect(brickX2, brickY2, brickWidth2, brickHeight2);
              context.fillStyle = "#fcf403";
              context.fill();
              context.closePath();
          }
      }
  }
}

function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "#FC0101";
  context.fillText("Colombia: "+score, 19, 40);
}

function drawScore2() {
  context.font = "16px Arial";
  context.fillStyle = "#FC0101";
  context.fillText("Brasil: "+score2, canvas.width-78, 40);
}


function draw() {
    var hh=new Image();
hh.src="../fondo.jpg";
  context.drawImage( hh, 0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBricks2();
  drawBall();
  drawPaddle();
  drawPaddle2();
  drawScore();
  drawScore2();
  collisionDetection();
  collisionDetection2();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
  }    
  else if(x > paddleX-10 && x < paddleX+5 &&    y > paddleY+7  && y < paddleY+11 ){
      dx = -0.5;
  }        

  else if(x > paddleX+38 && x < paddleX+53 && y > paddleY+7  && y < paddleY+11){
      dx = 0.5;
  }
  else if(x > paddleX2-10 && x < paddleX2+5 &&    y > paddleY2+7  && y < paddleY2+11 ){
      dx = -0.5;
  }        

  else if(x > paddleX2+38 && x < paddleX2+53 && y > paddleY2+7  && y < paddleY2+11){
      dx = 0.5;
  }
  if(y + dy > canvas.height - ballRadius|| y + dy < ballRadius) {
      dy = -dy;
  }    
  else if(x > paddleX && x < paddleX + paddleWidth && y > paddleY-5 && y  < paddleY-2){
      dy = -0.8;      
      
  } 
  else if(x > paddleX && x < paddleX + paddleWidth && y > paddleY+20 && y  < paddleY+27){
      dy = 0.8;      
  } 
  else if(x > paddleX2 && x < paddleX2 + paddleWidth && y > paddleY2-5 && y  < paddleY2-2){
      dy = -0.8;      
      
  } 
  else if(x > paddleX2 && x < paddleX2 + paddleWidth && y > paddleY2+20 && y  < paddleY2+27){
      dy = 0.8;      
  } 
  
  //---Mover si pulso una tecla
  //---J1
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 5;
  }
  else if(leftPressed && paddleX > 0) {
      paddleX -= 5;
  }
  else if(upPressed && paddleY > 20 && !(x > paddleX && x < paddleX + paddleWidth && paddleY > y && paddleY-10 < y)) {
      paddleY -= 5;
  }
  else if(downPressed && paddleY < canvas.height-24 && !(x > paddleX && x < paddleX + paddleWidth && paddleY < y && paddleY+20 > y)) {
      paddleY += 5;
  }
  //---J2
  
  if(dPressed && paddleX2 < canvas.width-paddleWidth) {
      paddleX2 += 5;
  }
  else if(aPressed && paddleX2 > 0) {
      paddleX2 -= 5;
  }
  else if(wPressed && paddleY2 > 20 && !(x > paddleX2 && x < paddleX2 + paddleWidth && paddleY2 > y && paddleY2-10 < y)) {
      paddleY2 -= 5;
  }
  else if(sPressed && paddleY2 < canvas.height-24 && !(x > paddleX2 && x < paddleX2 + paddleWidth && paddleY2 < y && paddleY2+20 > y)) {
      paddleY2 += 5;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}


}
function izquierda(){
  if(paddleX > 0 ){
      paddleX -= 10;
  }
}
function derecha(){
  if( paddleX < (paddleX*2)){
      paddleX += 10;
  }
}
function arriba(){
  if(paddleY > 0 ){
      paddleY -= 10;
  }
}
function abajo(){
  if( paddleY < (y*2)-24){
      paddleY += 10;
  }
}
function izquierda2(){
  if(paddleX2 > 0 ){
      paddleX2 -= 10;
  }
}
function derecha2(){
  if( paddleX2 < (paddleX2*2)){
      paddleX2 += 10;
  }
}
function arriba2(){
  if(paddleY2 > 0 ){
      paddleY2 -= 10;
  }
}
function abajo2(){
  if( paddleY2 < (y*2)-24){
      paddleY2 += 10;
  }
}