var Client = {};
const IP_SERVER='http://192.168.19.202:8081';
Client.socket = io.connect();

Client.efectoBoton = function(button){
    sndSoundButton.play();
    game.add.tween(button).to({ y: (button.y)+3 }, 200, "Sine.easeInOut", true);
    setTimeout(function(){
        game.add.tween(button).to({ y: button.y-3 }, 200, "Sine.easeInOut", true);
    }, 200);
}

Client.agregarBotonesTop = function(){
    var sound, muted;
    function mutear(){
        sound = game.add.button(569, 25,'sound', function(){
            
            sound.destroy();
            game.sound.mute=true;
            localStorage.setItem("sound", 0);
            activarSonido();
            Client.efectoBoton(muted);
        }, this, 2, 1, 0);
        sound.scale.setTo(0.25, 0.25);
    }
    
    function activarSonido(){
        muted = game.add.button(569, 25,'muted', function(){
            muted.destroy();
            game.sound.mute=false;
            localStorage.setItem("sound", 1);
            mutear();
            Client.efectoBoton(sound);
        }, this, 2, 1, 0);
        muted.scale.setTo(0.25, 0.25);
    }
    
    if (localStorage.getItem("sound")==1||localStorage.getItem("sound")==undefined){
        mutear();
    }else if (localStorage.getItem("sound")==0){  
        activarSonido();
    }
    
    var ranking = game.add.button(621, 25,'ranking', function(){
        Client.efectoBoton(ranking);
        if (game.state.getCurrentState().key=="Lobby"){
            datosPartida.name="";
            datosPartida.maxPlayers="";
            Client.leaveRoom();
            Client.actualizarListaRoom();
        }
        game.state.start("Ranking");
    }, this, 2, 1, 0);
    ranking.scale.setTo(0.25, 0.25);
    
    var opciones = game.add.button(673, 25,'opciones', function(){
        Client.efectoBoton(opciones);
        if (game.state.getCurrentState().key=="Lobby"){
            datosPartida.name="";
            datosPartida.maxPlayers="";
            Client.leaveRoom();
            Client.actualizarListaRoom();
        }
        game.state.start("Settings");
    }, this, 2, 1, 0);
    opciones.scale.setTo(0.25, 0.25);
    
    var home = game.add.button(725, 25,'home', function(){
        //Si estoy en la escena Lobby aviso a los demás de que me he ido para que actualicen la lista
        if (game.state.getCurrentState().key=="Lobby"){
            datosPartida.name="";
            datosPartida.maxPlayers="";
            Client.leaveRoom();
            Client.actualizarListaRoom();
        }
        Client.efectoBoton(home);
        game.state.start("MenuPrincipal");
    }, this, 2, 1, 0);
    home.scale.setTo(0.25, 0.25);
};

//Metodo que muestra una pantalla de loading mientras se hacen conexiones ajax
Client.loading = function(grupoBotones){
    desactivarGrupoBotones(grupoBotones);
    grupoLoading= game.add.group();
    var transparencia = game.add.sprite(0,0, 'transparencia');
    grupoLoading.add(transparencia);
    
    var loading = game.add.sprite(400,300, 'load');
    loading.anchor.setTo(0.5,0.5);
    game.add.tween(loading).to( { angle: 360 }, 1000, Phaser.Easing.Linear.None, true, 0, true).loop(true);
    grupoLoading.add(loading);   
    
    return grupoLoading;
}

//Metodo que recibe el titulo y mensaje de un popup y te lo muestra, SI ESCENA VIENE NULL, EL BOTON ACEPTAR CERRARA EL POPUP
Client.popup = function(titulo, mensaje, grupoBotones, escena, datos){
    desactivarGrupoBotones(grupoBotones);
    grupoPopup= game.add.group();
    transparencia = game.add.sprite(0,0, 'transparencia');
    grupoPopup.add(transparencia);
    
    //Sprite de fondo, popup
    popup = game.add.sprite(400, 300, 'popup');
    popup.anchor.setTo(0.5,0.5);
    popup.scale.setTo(0.6, 0.6);
    grupoPopup.add(popup);
    
    //Texto del titulo
    var textTitulo = game.add.text(400, 150, titulo);
    textTitulo.font = 'Comfortaa';
    textTitulo.fontSize = 25;
    textTitulo.fill = '#ffffff';
    textTitulo.anchor.setTo(0.5,0.5);
    grupoPopup.add(textTitulo);
    
    //Texto del mensaje
    var textMensaje = game.add.text(400, 285, mensaje);
    textMensaje.font = 'Comfortaa';
    textMensaje.fontSize = 21;
    textMensaje.fill = '#000000';
    textMensaje.anchor.setTo(0.5,0.5);
    grupoPopup.add(textMensaje);
    
    //Boton de aceptar
    var botonAceptar = game.add.button(400, 390,'botonAzul', function(){
        Client.efectoBoton(botonAceptar);
        if (escena==null){
            grupoPopup.removeAll();
            activarGrupoBotones(grupoBotones);
        }else if (escena=="Lobby"){
            game.state.start(escena);
            Client.playerJoinRoom(datos.name,datos.data);
        }else if (escena=="MenuLobby"){
            actualizaPartidas();
        }else{
            game.state.start(escena);
        }
        
    }, this, 2, 1, 0);
    botonAceptar.scale.setTo(0.4, 0.3);
    botonAceptar.anchor.setTo(0.5,0.5);
    grupoPopup.add(botonAceptar);
    
    
    //Texto del boton
    var textBoton = game.add.text(botonAceptar.x, botonAceptar.y, "ACCEPT");
    textBoton.font = 'Comfortaa';
    textBoton.fontSize = 20;
    textBoton.fill = '#ffffff';
    textBoton.anchor.setTo(0.5,0.5);
    grupoPopup.add(textBoton);
    
    game.world.bringToTop(grupoPopup);
};

Client.playerJoinRoom = function(roomName,idSalaCreada){
    Client.socket.emit('playerJoinRoom',roomName,datosUsuario.idUsuario,idSalaCreada,datosUsuario.color);
};

Client.actualizarListaRoom = function (){
    Client.socket.emit('actualizarListaRoom');
};

Client.socket.on('actualizaLobbyRoom',function(){
    Lobby.actualizarLista();
});

Client.startGame = function(matriz){
    Client.socket.emit('startGame',matriz);
};

Client.sendMySpeed = function (x,y,id){
    Client.socket.emit('sendMySpeed',x,y,id);
};

Client.login = function (idUsuario, color){
    Client.socket.emit('login',idUsuario,color);
};

Client.sendMyLocation = function (x,y,id){
    Client.socket.emit('sendMyLocation',x,y,id);
};

Client.enviarChoque = function (idEnemigo, velXMia, velYMia){
    Client.socket.emit('actualizaChoque',idEnemigo,velXMia,velYMia);
};

Client.enviarPotencia = function (idPlayer){
    Client.socket.emit('actualizaPotencia',idPlayer);
};

Client.socket.on('incrementaPotencia',function(idPlayer){
    Game.incrementaPotencia(idPlayer);
});

Client.leaveRoom = function (){
    Client.socket.emit('leaveUser');
};

Client.socket.on('updatePlayerSpeed',function(playerRecibido){
    Game.updatePlayerSpeed(playerRecibido);
});

Client.socket.on('updatePlayerLocation',function(playerRecibido){
    Game.updatePlayerLocation(playerRecibido);
});

Client.socket.on('actualizaPostChoque',function(playerRecibido){
    Game.actualizaPostChoque(playerRecibido);
});


Client.askNewPlayer = function(){console.log("voy a crear mi jugador")
    Client.socket.emit('newplayer');
};

Client.socket.on('sendStartGame',function(matriz){
    Lobby.comenzarPartida(matriz);
    Client.socket.emit('incrementarPartidaJugada');
});

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y,data.color);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }                                     
});

Client.playerLose = function(){
    Client.socket.emit('playerLose');
};

Client.playerWin = function(){
    Client.socket.emit('playerWin');
};

Client.socket.on('remove',function(id){console.log("BORRO EL PLAYER "+id+" QUE SE HA IDO")
    Game.removePlayer(id);
});

function desactivarGrupoBotones(grupoBotones){
    for (var i = 0; i < grupoBotones.children.length; i++) { 
        grupoBotones.children[i].inputEnabled=false;
    }
}

function activarGrupoBotones(grupoBotones){
    for (var i = 0; i < grupoBotones.children.length; i++) { 
        grupoBotones.children[i].inputEnabled=true;
        grupoBotones.children[i].input.useHandCursor = true;
    }
}

