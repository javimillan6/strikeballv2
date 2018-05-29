var PantallaCarga = {};

var text;
var button;


PantallaCarga.init = function(){
    game.stage.disableVisibilityChange = true;
};

PantallaCarga.preload = function() {

};

PantallaCarga.create = function(){
    game.add.sprite(0,0, 'fondoMenu');
    loading = game.add.sprite(399,280, 'loading');
    loading.anchor.setTo(0.5,0.5);
    //	You can listen for each of these events from Phaser.Loader
    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);


    text = game.add.text(366, 265, '0%', { fill: '#ffffff' });
    text.fontSize = 38;
    start();
};

function start(){
    //SPRITES
    game.load.image('bIzquierda', 'assets/menu/bolasColores/bola5_grande.png');
    game.load.image('bDerecha', 'assets/menu/bolasColores/bola8_grande.png');
    game.load.image('strikeballName', 'assets/menu/strikeballName.png');
    game.load.image('v2Name', 'assets/menu/v2Name.png');
    game.load.image('botonVerde', 'assets/menu/botonVerde.png');
    game.load.image('botonAzul', 'assets/menu/botonAzul.png');
    game.load.image('bola1', 'assets/menu/bolasColores/bola1.png');
    game.load.image('bola2', 'assets/menu/bolasColores/bola2.png');
    game.load.image('bola3', 'assets/menu/bolasColores/bola3.png');
    game.load.image('bola4', 'assets/menu/bolasColores/bola4.png');
    game.load.image('bola5', 'assets/menu/bolasColores/bola5.png');
    game.load.image('bola6', 'assets/menu/bolasColores/bola6.png');
    game.load.image('bola7', 'assets/menu/bolasColores/bola7.png');
    game.load.image('bola8', 'assets/menu/bolasColores/bola8.png');
    game.load.image('bola9', 'assets/menu/bolasColores/bola9.png');
    game.load.image('transparencia', 'assets/menu/transparencia.png');
    game.load.image('load', 'assets/menu/load.png');
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image('lobbyBoard', 'assets/menu/lobbyBoard.png');
    game.load.image('lobbyNames','assets/menu/lobbyNames.png');
    game.load.image('lazo','assets/menu/lazo.png');
    game.load.image('lobbyNamesFondo','assets/menu/lobbyNamesFondo.png');
    game.load.image('terreno','assets/mapa/suelo/terrenoCesped.png');
    game.load.image('baja', 'assets/menu/baja.png');
    game.load.image('sube', 'assets/menu/sube.png');
    game.load.image('actualizar', 'assets/menu/actualizar.png');
    game.load.image('playerLobby', 'assets/menu/playerLobby.png');
    game.load.image('blue', 'assets/player/playerBlue.png');
    game.load.image('green', 'assets/player/playerGreen.png');
    game.load.image('red', 'assets/player/playerRed.png');
    game.load.image('arrowblue', 'assets/player/arrowBlue.png');
    game.load.image('arrowred', 'assets/player/arrowRed.png');
    game.load.image('arrowgreen', 'assets/player/arrowGreen.png');
    game.load.image('cesped','assets/mapa/suelo/terrenoCesped.png');
    game.load.image('arrows', 'assets/howtoplay/arrows.png');
    game.load.image('end', 'assets/howtoplay/end.png');
    game.load.image('hit', 'assets/howtoplay/hit.png');
    game.load.image('playerBlue', 'assets/player/playerBlue.png');
    game.load.image('playerGreen', 'assets/player/playerGreen.png');
    game.load.image('playerRed', 'assets/player/playerRed.png');
    game.load.image('jugador', 'assets/player/playerBlue.png');
    game.load.spritesheet('agua', 'assets/mapa/aguaSpriteSheet.png', 100, 100);
    game.load.spritesheet('marco', 'assets/mapa/marco.png', 659, 484, 16);
    game.load.image('terrenoCesped', 'assets/mapa/suelo/terrenoCesped.png');
    game.load.image('brujula', 'assets/mapa/brujula.png');
    game.load.image('terrenoCespedTop', 'assets/mapa/suelo/terrenoCespedTop.png');
    game.load.image('terrenoCespedTopRight', 'assets/mapa/suelo/terrenoCespedTopRight.png');
    game.load.image('terrenoCespedTopLeft', 'assets/mapa/suelo/terrenoCespedTopLeft.png');
    game.load.image('terrenoCespedBot', 'assets/mapa/suelo/terrenoCespedBot.png');
    game.load.image('terrenoCespedBotRight', 'assets/mapa/suelo/terrenoCespedBotRight.png');
    game.load.image('terrenoCespedBotLeft', 'assets/mapa/suelo/terrenoCespedBotLeft.png');
    game.load.image('terrenoCespedRight', 'assets/mapa/suelo/terrenoCespedRight.png');
    game.load.image('terrenoCespedLeft', 'assets/mapa/suelo/terrenoCespedLeft.png');
    game.load.image('wallHorizontal', 'assets/mapa/muro/muroHorizontal.png');
    game.load.image('wallVertical', 'assets/mapa/muro/muroVertical.png');
    game.load.image('wallHorizontal2', 'assets/mapa/muro/muroHorizontal2.png');
    game.load.image('wallHorizontal3', 'assets/mapa/muro/muroHorizontal3.png');
    game.load.image('wallVertical2', 'assets/mapa/muro/muroVertical2.png');
    game.load.image('wallVertical3', 'assets/mapa/muro/muroVertical3.png');
    game.load.image('velocidad', 'assets/mapa/velocidad.png');
    game.load.image('power', 'assets/mapa/power.png');
    game.load.image('numero1', 'assets/mapa/cuenta/1.png');
    game.load.image('numero2', 'assets/mapa/cuenta/2.png');  
    game.load.image('numero3', 'assets/mapa/cuenta/3.png');  
    game.load.image('go', 'assets/mapa/cuenta/go.png'); 
    game.load.image('opciones', 'assets/menu/opciones.png');
    game.load.image('home', 'assets/menu/home.png');
    game.load.image('sound', 'assets/menu/sound.png');
    game.load.image('muted', 'assets/menu/mute.png');
    game.load.image('ranking', 'assets/menu/ranking.png');
    game.load.image('popup','assets/menu/popup.png');
    game.load.image('teleportBlue','assets/mapa/teleports/teleportBlue.png');
    game.load.image('teleportRed','assets/mapa/teleports/teleportRed.png');
    game.load.image('teleportYellow','assets/mapa/teleports/teleportYellow.png');
    game.load.image('menuPrincipal', 'assets/menu/menuPrincipal.png');
    game.load.image('howToPlay', 'assets/menu/howToPlay.png');
    game.load.image('lobby', 'assets/menu/lobby.png');
    game.load.image('youwin', 'assets/menu/youwin.png');
    game.load.image('youdied', 'assets/menu/youdied.png');
    game.load.image('rankingTitle', 'assets/menu/rankingTitle.png');
    game.load.image('settings', 'assets/menu/settings.png');
    game.load.image('register', 'assets/menu/register.png');
    game.load.image('topwinplayers', 'assets/menu/topwinplayers.png');
    game.load.image('topratioplayers', 'assets/menu/topratioplayers.png');
    game.load.image('registerFondo', 'assets/menu/registerFondo.png');
    game.load.image('selectionColor', 'assets/menu/selectionColor.png');
    game.load.image('kirby', 'assets/player/playerKirby.png');
    game.load.image('jhon', 'assets/player/playerJhon.png');
    game.load.image('pokeball', 'assets/player/playerPokeball.png');
    game.load.image('arrowkirby', 'assets/player/arrowKirby.png');
    game.load.image('arrowjhon', 'assets/player/arrowJhon.png');
    game.load.image('arrowpokeball', 'assets/player/arrowPokeball.png');
    
    //AUDIOS
    game.load.audio('explosion', 'assets/audio/explosion.wav');
    game.load.audio('fondo', 'assets/audio/fondo.wav');
    game.load.audio('choque', 'assets/audio/choque.wav');
    game.load.audio('potencia', 'assets/audio/potencia.mp3');
    game.load.audio('sprint', 'assets/audio/sprint.wav');
    game.load.audio('teleport', 'assets/audio/teleport.wav');
    game.load.audio('soundButton', 'assets/audio/button.wav');
    game.load.audio('swim', 'assets/audio/swim.mp3');
    game.load.audio('win', 'assets/audio/win.mp3');
    game.load.audio('sound01', 'assets/audio/sound01.wav');
    game.load.audio('sound02', 'assets/audio/sound02.wav');
    game.load.audio('sound03', 'assets/audio/sound03.wav');
    game.load.audio('go', 'assets/audio/go.mp3');

    game.load.start();
}



PantallaCarga.update = function(){
    loading.angle +=5;
};


function loadStart() {

	text.setText("0%");

}

//	This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    
	text.setText(progress+"%");                                                                    

}

function loadComplete() {
    //audios
    sndExplosion = game.add.audio('explosion');
    sndFondo = game.add.audio('fondo');
    sndChoque = game.add.audio('choque');
    sndPotencia = game.add.audio('potencia');
    sndSprint = game.add.audio('sprint');
    sndTeleport = game.add.audio('teleport');
    sndSoundButton = game.add.audio('soundButton');
    sndSwim = game.add.audio('swim');
    sndWin = game.add.audio('win');
    snd01 = game.add.audio('sound01');
    snd02 = game.add.audio('sound02');
    snd03 = game.add.audio('sound03');
    sndGO = game.add.audio('go');
    
    game.state.start("PantallaPrincipal");
}