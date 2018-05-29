var MenuLobby = {};
var grupoPartidas;
var cont = 4;
var totalPlayers=0;
var datosPartida = new Object();
var puedoScroll=true;
var inputGrupoMenuLobby;

MenuLobby.init = function(){
    game.stage.disableVisibilityChange = true;
};


MenuLobby.preload = function(){ 
    /*game.load.image('fondoMenu', 'assets/menu/fondo.png');
    game.load.image('botonAzul', 'assets/menu/botonAzul.png');
    game.load.image('lobbyBoard', 'assets/menu/lobbyBoard.png');
    game.load.image('lobbyNames','assets/menu/lobbyNames.png');
    game.load.image('lazo','assets/menu/lazo.png');
    game.load.image('lobbyNamesFondo','assets/menu/lobbyNamesFondo.png');
    game.load.image('terreno','assets/mapa/suelo/terrenoCesped.png');
    game.load.image('baja', 'assets/menu/baja.png');
    game.load.image('sube', 'assets/menu/sube.png');
    game.load.image('actualizar', 'assets/menu/actualizar.png');*/
};

MenuLobby.create = function() {
    inputGrupoMenuLobby = game.add.group();
    datosPartida.gameStarted=false;
    actualizaPartidas();
    game.add.sprite(0,0, 'fondoMenu');
    
    var lazo = game.add.sprite(25, 69, 'lazo');
    lazo.scale.setTo(0.57, 0.61);
    
    var textPlay = game.add.text(130, 94, "NEW ROOM");
    textPlay.font = 'Comfortaa';
    textPlay.fontSize = 22;
    textPlay.fill = '#ffffff';
    
    var textSettings = game.add.text(30, 186, "SETTINGS:");
    textSettings.font = 'Comfortaa';
    textSettings.fontSize = 21;
    textSettings.fill = '#000000';
        
    var textSettings = game.add.text(30, 241, "Name:");
    textSettings.font = 'Comfortaa';
    textSettings.fontSize = 20;
    textSettings.fill = '#000000';
    
    var inputName = game.add.inputField(120, 236, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 215,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Room name',
        type: PhaserInput.InputType.text
    });
    inputGrupoMenuLobby.add(inputName);
    
    var textMaxPlayers = game.add.text(30, 305, "Max Players:");
    textMaxPlayers.font = 'Comfortaa';
    textMaxPlayers.fontSize = 20;
    textMaxPlayers.fill = '#000000';
    
    var inputMaxPlayers = game.add.inputField(185, 304, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: '1-99',
        type: PhaserInput.InputType.text
    });
    inputGrupoMenuLobby.add(inputMaxPlayers);
    
    var textmap = game.add.text(30, 376, "Select map:");
    textmap.font = 'Comfortaa';
    textmap.fontSize = 20;
    textmap.fill = '#000000';
    
    var imgTerreno = game.add.sprite(185, 372, 'terreno');
    imgTerreno.scale.setTo(0.45, 0.45);
    
    var lobbyBoard = game.add.sprite(415, 75, 'lobbyBoard');
    lobbyBoard.scale.setTo(0.57, 0.61);
    
    var btnbaja = game.add.button(710, 201,'baja', function(){
        if ((cont<totalPlayers)&&(puedoScroll)){
            Client.efectoBoton(btnbaja);
            puedoScroll=false;
            game.add.tween(grupoPartidas).to({ y: (grupoPartidas.y)-90 }, 400, "Sine.easeInOut", true);
            cont++;
            setTimeout(function(){ puedoScroll=true; }, 400);
        }
    }, this, 2, 1, 0);
    btnbaja.scale.setTo(0.20, 0.20);
    inputGrupoMenuLobby.add(btnbaja);
    
    var btnsube = game.add.button(710, 164,'sube', function(){
        if ((cont>4)&&(puedoScroll)){
            Client.efectoBoton(btnsube);
            puedoScroll=false;
            game.add.tween(grupoPartidas).to({ y: (grupoPartidas.y)+90 }, 400, "Sine.easeInOut", true);
            cont--;
            setTimeout(function(){ puedoScroll=true; }, 400);
        }
    }, this, 2, 1, 0);
    btnsube.scale.setTo(0.20, 0.20);
    inputGrupoMenuLobby.add(btnsube);
    
    var btnactualizar = game.add.button(710, 238,'actualizar', function(){
        Client.efectoBoton(btnactualizar);
        grupoPartidas.removeAll();
        actualizaPartidas();
    }, this, 2, 1, 0);
    btnactualizar.scale.setTo(0.20, 0.20);
    inputGrupoMenuLobby.add(btnactualizar);
    
    

    var textPlay = game.add.text(lobbyBoard.x+80, lobbyBoard.y+20, "CURRENT GAMES");
    textPlay.font = 'Comfortaa';
    textPlay.fontSize = 22;
    textPlay.fill = '#ffffff';
    
    var botonCreateRoom = game.add.button(100, 450,'botonAzul', function(){
        Client.efectoBoton(botonCreateRoom);
        if (inputName.getText().length==0 || inputMaxPlayers.getText().length==0){
            Client.popup("CREATE ROOM","Please fill all the fields",inputGrupoMenuLobby,null);
        }else if (inputMaxPlayers.getText()<=0||inputMaxPlayers.getText()>=100){
            Client.popup("CREATE ROOM","Range players out of limits",inputGrupoMenuLobby,null);
        }else{
            datosPartida.maxPlayers=inputMaxPlayers.getText();
            datosPartida.map='cesped';
            var grupoLoading = Client.loading(inputGrupo);
            $.ajax({ 
            url: IP_SERVER+'/newRoom',
            data: {name : inputName.getText(), maxPlayers : inputMaxPlayers.getText(), idUsuario : datosUsuario.idUsuario},        
            type: "POST",
            success: function(data) {
                grupoLoading.removeAll();
                activarGrupoBotones(inputGrupo);
                //data es el la id con la que la sala se ha creado
                datosPartida.name=inputName.getText();
                var datos = new Object();
                datos.name=datosPartida.name;
                datos.data=data;
                Client.popup("CREATE ROOM","Room "+inputName.getText()+" created!",inputGrupoMenuLobby,"Lobby",datos);
                //Client.playerJoinRoom(datosPartida.name,data);
            },
            error: function() {
                console.log("No se ha podido obtener la información");
                Client.popup("CREATE ROOM","error when creating the room",inputGrupoMenuLobby,null);
            }
        }); 
        } 
    }, this, 2, 1, 0);
    botonCreateRoom.scale.setTo(0.5, 0.4);
    inputGrupoMenuLobby.add(botonCreateRoom);
    
    game.world.bringToTop(inputGrupoMenuLobby);
    
    var textCreate = game.add.text(botonCreateRoom.x+45, botonCreateRoom.y+15, "CREATE");
    textCreate.font = 'Comfortaa';
    textCreate.fontSize = 30;
    textCreate.fill = '#ffffff';
    
    
    Client.agregarBotonesTop();
};

MenuLobby.update = function(){

};

function mostrarLobby(idRoom,nameRoom, nPlayers, nMaxPlayers, posX, posY){
    var lobbyFondo = game.add.button(posX, posY, 'lobbyNamesFondo', function(){
        Client.efectoBoton(lobbyFondo);
        if (!roomIsFull(idRoom,nMaxPlayers)){
            datosPartida.name=nameRoom;
            datosPartida.idRoom=idRoom;
            datosPartida.maxPlayers=nMaxPlayers;
            datosPartida.map='cesped';
            var grupoLoading = Client.loading(inputGrupo);
            $.ajax({
            url: IP_SERVER+'/unirmeASala',
            type: "POST",
            data: {idRoom : idRoom, idPlayer : datosUsuario.idUsuario},
            success: function(data) {
                grupoLoading.removeAll();
                activarGrupoBotones(inputGrupo);
                Client.playerJoinRoom(datosPartida.name);
                game.state.start("Lobby");
            },
            error: function() {
                console.log("No se ha podido obtener la información");
            }});
        }else{
            Client.popup("Joining room ", "This room is full, please try other.", inputGrupoMenuLobby, null, null);
        }
        
        
        
    }, this, 2, 1, 0);
    lobbyFondo.scale.setTo(0.62, 0.63);
    grupoPartidas.add(lobbyFondo);
    
    var lobbyNames = game.add.sprite(posX-10, posY+10, 'lobbyNames');
    lobbyNames.scale.setTo(0.62, 0.63);
    grupoPartidas.add(lobbyNames);
    
    var terreno = game.add.sprite(posX+17, posY+19, 'terreno');
    terreno.scale.setTo(0.54, 0.54);
    grupoPartidas.add(terreno);
    
    
    var textName = game.add.text(lobbyFondo.x+86, lobbyFondo.y+43, nameRoom);
    textName.font = 'Comfortaa';
    textName.fontSize = 18;
    textName.fill = '#ffffff';
    grupoPartidas.add(textName);
    
    var textPlayers = game.add.text(lobbyFondo.x+86, lobbyFondo.y+15, "Act: "+nPlayers);
    textPlayers.font = 'Comfortaa';
    textPlayers.fontSize = 14;
    textPlayers.fill = '#ffffff';
    grupoPartidas.add(textPlayers);
    
    var textMaxPlayers = game.add.text(lobbyFondo.x+179, lobbyFondo.y+15, "Max: "+nMaxPlayers);
    textMaxPlayers.font = 'Comfortaa';
    textMaxPlayers.fontSize = 14;
    textMaxPlayers.fill = '#ffffff';
    grupoPartidas.add(textMaxPlayers);
    
};

function roomIsFull(idRoom,nMaxPlayers){
    var resultado=false;
    var grupoLoading = Client.loading(inputGrupo);
    $.ajax({
        url: IP_SERVER+'/roomIsFull',
        async: false,
        type: "POST",
        data: {idRoom : idRoom},
        success: function(data) {
            grupoLoading.removeAll();
            activarGrupoBotones(inputGrupo);
            if (data<nMaxPlayers&&data>0){
                resultado= false;
            }else{
                resultado= true;
            }
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
    return resultado;
}

function actualizaPartidas(){
    var grupoLoading = Client.loading(inputGrupo);
    $.ajax({
        url: IP_SERVER+'/getSalas',
        type: "GET",
        success: function(data) {
            grupoLoading.removeAll();
            activarGrupoBotones(inputGrupo);
            cont = 4;
            puedoScroll=true;
            totalPlayers=data.length;
            grupoPartidas= game.add.group();
            var mask = game.add.graphics(0, 100);
            mask.beginFill(0xffffff);
            mask.drawRect(444, 69, 262, 357);
            grupoPartidas.mask = mask;
            
            for(var partida in data){
                mostrarLobby(data[partida].idRoom,data[partida].nameRoom,data[partida].actual,data[partida].maxPlayers,437,164+(partida*90));
            }
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}
