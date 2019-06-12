/* 
    Equipe: 
        Filipe Gregório de Farias e Silva - Subturma D (Líder) 
        Ivamar Dantas Roque - Subturma D 
        Todas as etapas
        Jogo em Estilo Plataforma
*/
var x = 95; y = 555; yp = 0; t = 0;
var dia = [];
var pulo = false;
var pontos = 0;
var lvl = 1;
var vx = []; vy = []; vdx = [];vtam = []; vtam1 = []; vnx = [];vny = [];vnx1 = [];vny1 = [];
var qt = 8; 
var vMuroTam = []; vMuroAlt = []; vMuroX = []; 
var VveloX = -5;
var tela = 0;
var imgAndando = []; contFrame = 0; paraFrame = 0;
var anima; 
var animaPulo; 
var animaSent;
var textoX = 180; contTexto = 0; ContTexto = 0;
var imgPedra = [];
var Moti;
function preload(){ //Imagens Etapa 10
  for(i = 0; i <3; i++){
    imgAndando[i] = loadImage("Andre_andando_"+i+".png");
  }
  for(i = 0; i < 5; i++){
    imgPedra[i] = loadImage("Muro_"+i+".png");
  }
  animaPulo = loadImage("Andre_pulo_0.png");
  animaSent = loadImage("Andre_sentado_0.png");
  cenario = loadImage('fundo1.png');
  nuvem1 = loadImage('nuvem1.png');
  nuvem2 = loadImage('nuvem2.png');
  noite = loadImage('fundon1.png');
  soundFormats('mp3', 'ogg');
  mexicano = loadSound('cucaracha.mp3');
  Moti = loadImage("Motivacional.png");
}

function gameover(){ //Tela game over Etapa 9
  clear();
  background(20);
  textSize(32);
  fill(255,255,255);
  text("GAME OVER ",295,275);
  image(animaSent, 500, 401);
  image(Moti, 400, 500, 250,150);
  text("Aperte ENTER para recomeçar!", 180, 325);
  if (keyIsDown(ENTER)) {
    pedramuro();
    lvl = 1;
    pontos = 0;
    tela = 0;
    mexicano.play();
  }
}
function nuvem(){
  for ( i = 1; i<5; i++){
    vnx[i] = random (0,1200);
    vny[i] = random (150,350);
    vnx1[i] = random (0,800);
    vny1[i] = random (50,150);
  }

}
function pedramuro(){
  for ( i = 0; i < qt; i++) { //Vetor etapa 8
    vx[i] = random(0,800); 
    vy[i] = random (560,585);
    vtam[i] = 4
    vtam1[i] = random(3,10)
  }
  vMuroTam[0] = 35; vMuroTam[1] = 17; vMuroTam[2] = 40; vMuroTam[3] = 15; vMuroTam[4] = 40;
  vMuroAlt[0] = 55; vMuroAlt[1] = 45; vMuroAlt[2] = 40; vMuroAlt[3] = 35; vMuroAlt[4] = 50;
  for(i = 0; i <5; i++){
    vMuroX[i] = random(100*i,800*i*i+500)+1200;
  }
}

function setup(){
  createCanvas(800, 600);
  frameRate(60); 
  pedramuro();
  nuvem();
}

function draw() {
  if ( tela == 0) {
    clear();
    background (0);
    textSize (32);
    fill (255,255,255);
    ContTexto++;
    if(ContTexto > 5){
      contTexto++;
      ContTexto = 0
    }
    if(contTexto%2 == 0){
      TextoX = 180;
    }
    if(contTexto%2 == 1){
      TextoX = 1000
    }
    text("Aperte ENTER para começar!",TextoX,310);
    if (keyIsDown(ENTER) ) {
      mexicano.setVolume(0.1);
      mexicano.play();
      tela = 1;
    }
  }
  if (tela == 1){
    
    clear();
    background(188,60,61);
     for (i=0;i<5;i++){
    if (lvl ==1){
    dia[i] = image(cenario, 400, 250, 800, 600);
    }
    if (lvl ==2){
    dia[i] = image(noite, 400, 250, 800, 600);
    fill(255);
    }
    if (lvl ==3){
    dia[i] = image(cenario, 400, 250, 800, 600);
    fill (0);
    }
    if (lvl ==4){
    dia[i] = image(noite, 400, 250, 800, 600);
    fill(255);
    }
    if (lvl ==5){
    dia[i] = image(cenario, 400, 250, 800, 600);
    fill (0);
    } 
    }
    textSize(20)
  //HUD
    text('Pontuação: '+parseInt(pontos), 10, 30); //Etapa 5
    text('Nível: '+lvl, 300, 30);
    pontos+=0.25;
   if(pontos==150){
      lvl++;
      VveloX = -5.5
    }
    if (pontos == 450){
      VveloX = -6;
      lvl++;
    }
    if (pontos == 800){
      VveloX = -6.5;
      lvl++;
    }
    if (pontos == 1200){
      VveloX = -8;
      lvl++;
    }
    for ( i = 0; i < qt; i++) {
    vx[i] = vx[i] + VveloX; 
    if ( vx[i] < 0 ) {
      vx[i] = 800+random(0,200) //Etapa 3 dentro do vetor
    }
    stroke(160,48,47);
    rect(0,550,800,1);
    fill(222,86,88);
    noStroke();
    rect(vx[i],vy[i],vtam1[i],vtam[i]); //Etapa 7 criação com vetores
    stroke(0);
    }
    for (i = 1; i < 5;i++){ // CONTADOR NUVEM
    vnx[i] = vnx[i] + VveloX/50; 
    if ( vnx[i] < 0 ) {
      vnx[i] = 800+random(0,200);
    }
    vnx1[i] = vnx1[i] + VveloX/50; 
    if ( vnx1[i] < 0 ) {
      vnx1[i] = 800+random(0,200);
    }
    image(nuvem1,vnx[i],vny[i],75,65);
    image(nuvem2,vnx1[i],vny1[i],75,15);
    }
  //Comando de pulo
    if(keyIsDown(UP_ARROW)&& (!pulo)){
      pulo = true
      t = 0
    }
    if(pulo){
      t++;
      yp = 0.5*(t)*(t - 30)
        if (yp > 0) {
		// habilita a ocorrência de um novo pulo Etapa 4
		    pulo = false;
		    yp = 0; 		
        }
    }
    fill(145,87,35);
    for(i = 0; i < 5; i++){
      image(imgPedra[i],vMuroX[i],600-vMuroAlt[i])
      vMuroX[i] += VveloX;
      if(vMuroX[i] < 0){
        vMuroX[i] = 1000;
      }
    }
    fill (255);
  // Etapa 10
    
      anima =  imgAndando[contFrame];
      imageMode(CENTER)
    if(y+yp == y){
      image(anima,x, y+yp)
    }
    if(y+yp< y){
      image(animaPulo,x, y+yp);
    }
    paraFrame++;
    if(paraFrame > 3){
      contFrame++;
      paraFrame = 0
    }
    if(contFrame > 2){
      contFrame = 0;
    }
    fill(0);
    for(i = 0; i <5; i++){
      if(dist(x,y+yp,vMuroX[i]+vMuroTam[i],570)<30){ //Etapa 6
        tela = 2;
      }
    }
    
  }
  if (tela == 2){
    mexicano.stop();
    gameover();
    nuvem();
  }
}
