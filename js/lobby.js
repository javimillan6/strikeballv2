var grupoJugadores;
var Lobby = {};
var cont = 4;
var totalPlayers=0;
var puedoScroll=true;
var botonCreateRoom;
var textPlay;
var textWaiting;
var botonesCreados=false;
var grupoBotones;

Lobby.init = function(){
    game.stage.disableVisibilityChange = true;
};

Lobby.preload = function(){ 
    /*game.load.image('fondoMenu', 'assets/menu/fondo.png');
    game.load.image('botonAzul', 'assets/menu/botonAzul.png');
    game.load.image('playerLobby', 'assets/menu/playerLobby.png');
    game.load.image('blue', 'assets/player/playerBlue.png');
    game.load.image('green', 'assets/player/playerGreen.png');
    game.load.image('red', 'assets/player/playerRed.png');
    game.load.image('cesped','assets/mapa/suelo/terrenoCesped.png');
    game.load.image('baja', 'assets/menu/baja.png');
    game.load.image('sube', 'assets/menu/sube.png');*/

};

Lobby.create = function(){
    datosPartida.gameStarted=false;
    game.add.sprite(0,0, 'fondoMenu');
    actualizaJugadores();
    
    game.add.sprite(100,27, 'lobby');
    
    /*var mask = game.add.graphics(0, 100);
    mask.beginFill(0xff0000);
    mask.drawRect(23, 62, 410, 345);*/
            
    var textName = game.add.text(500, 165, "Name: "+datosPartida.name);
    textName.font = 'Comfortaa';
    textName.fontSize = 23;
    textName.fill = '#ffffff';
    
    var textPlayers = game.add.text(500, 205, "Max players: "+datosPartida.maxPlayers);
    textPlayers.font = 'Comfortaa';
    textPlayers.fontSize = 23;
    textPlayers.fill = '#ffffff';
    
    var textTerreno = game.add.text(500, 245, "Map: ");
    textTerreno.font = 'Comfortaa';
    textTerreno.fontSize = 23;
    textTerreno.fill = '#ffffff';
    var imgMap = game.add.sprite(580, 290, datosPartida.map);
    
    var btnbaja = game.add.button(430, 203,'baja', function(){
        if ((cont<totalPlayers)&&(puedoScroll)){
            Client.efectoBoton(btnbaja);
            puedoScroll=false;
            game.add.tween(grupoJugadores).to({ y: (grupoJugadores.y)-88 }, 400, "Sine.easeInOut", true);
            cont++;
            setTimeout(function(){ puedoScroll=true; }, 400);
        }
    }, this, 2, 1, 0);
    btnbaja.scale.setTo(0.20, 0.20);
    
    var btnsube = game.add.button(430, 166,'sube', function(){
        if ((cont>4)&&(puedoScroll)){
            Client.efectoBoton(btnsube);
            puedoScroll=false;
            game.add.tween(grupoJugadores).to({ y: (grupoJugadores.y)+88 }, 400, "Sine.easeInOut", true);
            cont--;
            setTimeout(function(){ puedoScroll=true; }, 400);
        }
    }, this, 2, 1, 0);
    btnsube.scale.setTo(0.20, 0.20);
    
    Client.agregarBotonesTop();
    game.world.bringToTop(grupoLoading);
    
};

Lobby.update = function(){ 
    
};

Lobby.actualizarLista = function(){
    actualizaJugadores();
};

Lobby.comenzarPartida = function(matrizServer){
    matriz=matrizServer;
    game.state.start("Game");
    datosPartida.gameStarted=true;
};


/*Lobby.borrarLista = function(){
    if (grupoJugadores!=undefined) {
        grupoJugadores.removeAll();
    }
};*/

function mostrarPlayer(playerName, index, posX, posY, color){
    var pLobby = game.add.sprite(posX, posY, 'playerLobby');
    pLobby.scale.setTo(0.7, 0.6);
    grupoJugadores.add(pLobby);
    
    var name = game.add.text(pLobby.x+95, pLobby.y+40, playerName);
    name.font = 'Comfortaa';
    name.fontSize = 18;
    name.fill = '#ffffff';
    grupoJugadores.add(name);
    
    var name = game.add.text(pLobby.x+95, pLobby.y+13, "PLAYER "+index);
    name.font = 'Comfortaa';
    name.fontSize = 10;
    name.fill = '#ffffff';
    grupoJugadores.add(name);
    
    var color = game.add.sprite(pLobby.x+22, pLobby.y+16, color);
    grupoJugadores.add(color);
    
}

function actualizaJugadores(){
    if (!datosPartida.gameStarted){
        var grupoLoading = Client.loading(inputGrupo);
        $.ajax({
        url: IP_SERVER+'/getPlayersLobby',
        data: {nameRoom : datosPartida.name},  
        type: "POST",
        success: function(data) {
            grupoLoading.removeAll();
            activarGrupoBotones(inputGrupo);
            //borramos el contenido de la lista antes de agregar el nuevo contenido
            if (grupoJugadores!=undefined) {
                grupoJugadores.removeAll();
            }
            totalPlayers=data.length;
            datosPartida.playersConnected=data.length;
            grupoJugadores= game.add.group();
            var mask = game.add.graphics(0, 100);
            mask.beginFill(0xffffff);
            mask.drawRect(23, 62, 410, 345);
            grupoJugadores.mask = mask;
            datosPartida.leader=data[0].nickname;
            if (grupoBotones!=undefined) grupoBotones.removeAll();
            grupoBotones = game.add.group();
            //Si soy el leader pongo el boton de empezar partida y si no el texto de esperando al lider...
            if (datosPartida.leader==datosUsuario.nickname){
                botonCreateRoom = game.add.button(520, 440,'botonAzul',function(){
                    Client.efectoBoton(botonCreateRoom);
                    tablero = new Tablero();
                    matriz = tablero.getTablero();
                    Client.startGame(matriz);
                }, this, 2, 1, 0);
                grupoBotones.add(botonCreateRoom);
                botonCreateRoom.scale.setTo(0.5, 0.4);
                textPlay = game.add.text(botonCreateRoom.x+55, botonCreateRoom.y+15, "START");
                textPlay.font = 'Comfortaa';
                textPlay.fontSize = 30;
                textPlay.fill = '#ffffff';
                grupoBotones.add(textPlay);
            }else{
                textWaiting = game.add.text(490, 440, "Waiting for leader...");
                textWaiting.font = 'Comfortaa';
                textWaiting.fontSize = 30;
                textWaiting.fill = '#ffffff'; 
                grupoBotones.add(textWaiting);
            }
            botonesCreados=true;
            for(var player in data){
                mostrarPlayer(data[player].nickname,parseInt(player)+1,25,165+(player*85),data[player].color);
            }
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
    }
    
}